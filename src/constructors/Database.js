const path = require("path");

class Database {
  constructor({development = false, caching = false, cwd = __dirname, name ="database", compression = false} = {}) {
    if (development) {
      this.database = new (require("json-config-store"))({
        cwd: cwd,
        configName: `${name}.json`
      });
      this.database.isReady = () => new Promise((res) => res());
      return this.database;
    }

    this.compression = compression;
    this.caching = caching;

    this.memory = {};
    this.ready = false;
    const sqlite3 = require("sqlite3");
    this.sqlite = new sqlite3.Database(path.join(cwd, `${name}.sqlite`));

    let i = setInterval(() => {
      if (!this.sqlite.open) return;
      clearInterval(i);
      this.sqlite.run("CREATE TABLE IF NOT EXISTS BananenBase (key TEXT, value TEXT);", () => {
        if (!this.caching) return this.ready = true;

        this.sqlite.all("SELECT * FROM BananenBase;", (err, data) => {
          if (err) throw err;
          data.forEach(d => {
            this.memory[d.key] = JSON.parse(d.value);
          });
          this.ready = true;
        });
      });
    });
  }

  isReady() {
    return new Promise((res) => {
      let i = setInterval(() => {
        if (!this.ready) return;
        res();
        clearInterval(i);
      }, 10);
    })
  }

  get(key) {
    key = this.sterilizeKey(key);
    if (this.memory[key]) return this.memory[key];

    return new Promise((res) => {
      this.sqlite.all(`SELECT value FROM BananenBase WHERE key='${key}';`, [], (err, data) => {
        if (err) throw err;
        if (data.length === 0) return res(undefined);
        res(this.desterilize(data[0].key));
      });
    }); 
  }

  set(key, value) {
    if (this.caching) this.memory[key] = value;
    value = this.sterilize(value);

    return new Promise((res) => {
      this.sqlite.all(`SELECT * FROM BananenBase where key='${key}'`, [], (err, data) => {
        if (err) throw err;
        let sql = "";
        if (data.length === 0) sql = `INSERT INTO BananenBase (key, value) VALUES ('${key}', '${value}')`;
        else sql = `UPDATE BananenBase SET value='${value}' WHERE key='${key}'`;
        this.sqlite.all(sql, [], (err) => {
          if (err) throw err;
          res(true);
        });
      });
    });
  }

  delete(key) {
    delete this.memory[key];

    return new Promise((res) => {
      this.sqlite.all(`DELETE FROM BananenBase WHERE key='${key}'`, [], (err) => {
        if (err) throw err;
        res(true);
      });
    });
  }

  sterilize(data) {
    data = JSON.stringify(data) // Make the data JSON
           .split("'").join("''"); // Remove all single '
    if (!this.compression) return data;

    const lz = require("lzjs");
    return lz.compress(data);
  }
  desterilize(data) {
    data = JSON.parse(data) // Parse the JSON data
           .split("''").join(""); // All the '' back to '
    if (!this.compression) return data;

    const lz = require("lzjs");
    return lz.decompress(data);
  }

  sterilizeKey(key) {
    return key.split("'").join("''");
  }
}

module.exports = Database;