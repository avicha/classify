class Instance {
    constructor(obj) {
        this.obj = obj;
        this.weight = 1;
    }
    setDataset(dataset) {
        this.dataset = dataset;
        this.attrs = dataset.attrs;
        this.classAttr = dataset.classAttr;
        this.numAttributes = dataset.numAttributes;
    }
    setWeight(weight = 1) {
        this.weight = weight;
        return this;
    }
    classIsMissing() {
        return this.isMissing(this.classAttr);
    }
    isMissing(attr) {
        let attrValue = this.getAttrValue(attr);
        return attrValue == null;
    }
    getAttrValue(attr) {
        let attrValue = this.obj[attr.name];
        return attrValue == null ? null : attrValue;
    }
    getClassValue() {
        return this.getAttrValue(this.classAttr);
    }
}
module.exports = Instance;