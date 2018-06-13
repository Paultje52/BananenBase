const fs = require('fs')
const path = require('path')
const dotProp = require('../custom_modules/props')
const mkdirp = require('../custom_modules/dirp')

class BananenConfig {
    constructor(opts) {
        opts = Object.assign({}, opts)

        if (!opts.path) {
            throw new Error('Er ging iets fout: Je moet wel de path naar de data.json opgeven!');
        }

        if (!opts.name) {
            opts.name = 'data.json'
        }

        this.path = path.resolve(opts.path, opts.name)
        this.store = Object.assign({}, opts.defaults, this.store)
    }

    get(key) {
        return dotProp.get(this.store, key)
    }

    set(key, val) {
        if (typeof key !== 'string' && typeof key !== 'object') {
            throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`)
        }

        const store = this.store

        if (typeof key === 'object') {
            Object.keys(key).forEach(k => {
                dotProp.set(store, k, key[k])
            })
        } else {
            dotProp.set(store, key, val)
        }

        this.store = store
    }

    has(key) {
        return dotProp.has(this.store, key)
    }

    delete(key) {
        const store = this.store
        dotProp.delete(store, key)
        this.store = store
    }

    clear() {
        this.store = {}
    }

    get size() {
        return Object.keys(this.store).length
    }

    get store() {
        try {
            return Object.assign({}, JSON.parse(fs.readFileSync(this.path, 'utf8')))
        } catch (err) {
            if (err.code === 'ENOENT') {
                mkdirp.sync(path.dirname(this.path))
                return {}
            }

            if (err.name === 'SyntaxError') {
                return {}
            }

            throw err
        }
    }
    set store(val) {
        // Ensure the directory exists as it could have been deleted in the meantime
        mkdirp.sync(path.dirname(this.path))

        fs.writeFileSync(this.path, JSON.stringify(val, null, '\t'))
    }
    // Use `Object.entries()` here at some point
    *[Symbol.iterator]() {
        const store = this.store

        for (const key of Object.keys(store)) {
            yield [key, store[key]]
        }
    }
}

module.exports = BananenConfig
