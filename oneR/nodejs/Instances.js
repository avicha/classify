let Instance = require('./Instance.js');
let Attribute = require('./Attribute.js');
class Instances {
    constructor(relation, attrs) {
        this.relation = relation;
        this.attrs = attrs;
        this.numAttributes = attrs.length;
        this.classAttr = null;
        this.dataset = [];
    }
    setClassAttribute(classAttr) {
        if (!classAttr.isNominal() && !classAttr.isString()) {
            throw classAttr + ' must be nominal';
        } else {
            let valid = this.attrs.includes(classAttr);
            if (valid) {
                this.classAttr = classAttr;
                return this;
            }
            throw classAttr + ' is not exists';
        }
    }
    addInstance(instance) {
        let instanceObj = new Instance(instance);
        this.checkInstance(instanceObj);
        instanceObj.setDataset(this);
        this.dataset.push(instanceObj);
        return instanceObj;
    }
    deleteWithMissingClass() {
        this.dataset = this.dataset.filter(instance => !instance.classIsMissing());
        return this;
    }
    checkInstance(instance) {
        for (let attr of this.attrs) {
            let attrValue = instance.getAttrValue(attr);
            switch (attr.type) {
                case Attribute.NOMINAL:
                    let hasValue = attr.hasValue(attrValue);
                    if (!hasValue) {
                        if (instance.isMissing(attr)) {
                            attr.values.add(null);
                        } else {
                            throw 'nominal value not declared in header';
                        }
                    }
                    break;
                case Attribute.NUMERIC:
                    attrValue = Number(attrValue);
                    if (!instance.isMissing(attr) && isNaN(attrValue)) {
                        throw 'number expected';
                    }
                    break;
                case Attribute.STRING:
                    attr.addStringValue(attrValue);
                    break;
            }
        }
    }
}
module.exports = Instances;