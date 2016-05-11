let Instance = require('./Instance.js');
let Attribute = require('./Attribute.js');
class Instances {
    constructor(relation) {
        this.relation = relation;
        this.attrs = [];
        this.dataset = [];
    }
    setAttributes(...attrs) {
        attrs.forEach(attr => this.attrs.push(new Attribute(attr)));
        return this;
    }
    setClassAttribute(classAttr) {
        let classAttrIndex = this.attrs.findIndex(attr => attr.name == classAttr);
        if (~classAttrIndex) {
            this.classAttr = this.attrs[classAttrIndex];
            this.classAttrIndex = classAttrIndex;
            return this;
        }
        throw new Exception(classAttr + ' is not exists');
    }
    addInstance(instance) {
        let instanceObj = new Instance(instance);
        instanceObj.setAttributes(this.attrs);
        this.attrs.forEach(attr => attr.uniqValue(instanceObj.get(attr)));
        this.dataset.push(instanceObj);
        return instanceObj;
    }
    deleteWithMissingClass() {
        this.dataset = this.dataset.filter(instance => instance.get(this.classAttr) != null);
        return this;
    }
    prepare() {

    }
}
module.exports = Instances;