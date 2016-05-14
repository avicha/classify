let Attribute = require('./Attribute.js');
class Instance {
    constructor(obj) {
        this.obj = obj;
    }
    setDataset(dataset) {
        this.dataset = dataset;
        this.attrs = dataset.attrs;
        this.classAttr = dataset.classAttr;
        this.numAttributes = dataset.numAttributes;
        for (let attr of this.attrs) {
            let attrValue = this.getAttrValue(attr);
            switch (attr.type) {
                case Attribute.NOMINAL:
                    let hasValue = attr.hasValue(attrValue);
                    if (!hasValue) {
                        if (this.isMissing(attr)) {
                            attr.values.add(null);
                        } else {
                            throw 'nominal value not declared in header';
                        }
                    }
                    break;
                case Attribute.NUMERIC:
                    attrValue = Number(attrValue);
                    if (!this.isMissing(attr) && isNaN(attrValue)) {
                        throw 'number expected';
                    }
                    break;
                case Attribute.STRING:
                    attr.addStringValue(attrValue);
                    break;
            }
        }
    }
    classIsMissing() {
        return this.isMissing(this.classAttr);
    }
    isMissing(attr) {
        let attrValue = this.getAttrValue(attr);
        return attrValue == null;
    }
    getAttrValue(attr) {
        let attrValue = this.obj[attr.attributeName];
        return attrValue == null ? null : attrValue;
    }
    getClassValue() {
        return this.getAttrValue(this.classAttr);
    }
}
module.exports = Instance;