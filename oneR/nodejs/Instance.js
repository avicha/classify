class Instance {
    constructor(obj) {
        this.obj = obj;
    }
    setAttributes(attrs) {
        this.attrs = attrs;
    }
    get(attr) {
        return this.obj[attr.name];
    }
}
module.exports = Instance;