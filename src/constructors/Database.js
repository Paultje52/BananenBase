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
            this.memory[d.key] = this.desterilize(d.value);
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
    if (this.memory[key]) return this.memory[key];
    key = this.sterilizeKey(key);

    return new Promise((res) => {
      this.sqlite.all(`SELECT value FROM BananenBase WHERE key='${key}';`, [], (err, data) => {
        if (err) throw err;
        if (data.length === 0) return res(undefined);
        res(this.desterilize(data[0].value));
      });
    }); 
  }

  set(key, value) {
    if (this.caching) this.memory[key] = value;
    value = this.sterilize(value);
    key = this.sterilizeKey(key);

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
    key = this.sterilizeKey(key);

    return new Promise((res) => {
      this.sqlite.all(`DELETE FROM BananenBase WHERE key='${key}'`, [], (err) => {
        if (err) throw err;
        res(true);
      });
    });
  }

  sterilize(data) {
    try {
      data = data.split("'").join("''");
    } catch(e) {}
    data = JSON.stringify(data); // Make the data JSON
    if (!this.compression) return data;

    const lz = require("lzjs");
    return lz.compress(data);
  }

  desterilize(data) {
    if (!data) return undefined;
    if (this.compression) {
      const lz = require("lzjs");
      data = lz.decompress(data);
    }

    try {
      data = data.split("''").join("'");
    } catch(e) {}

    return JSON.parse(data); // Parse the JSON data
  }

  sterilizeKey(key) {
    return key.split("'").join("''");
  }
}

module.exports = Database;
