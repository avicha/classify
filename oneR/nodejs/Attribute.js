class Attribute {
    constructor(name) {
        this.name = name;
        this.values = new Set();
    }
    uniqValue(value) {
        this.values.add(value);
    }
}
module.exports = Attribute;