let Instance = require('./Instance.js');
class Instances {
    constructor(relation, attrs) {
        this.relation = relation;
        this.attrs = attrs;
        this.numAttributes = attrs.length;
        this.classAttr = null;
        this.classAttrIndex = -1;
        this.dataset = [];
    }
    setClassAttribute(classAttr) {
        if (!classAttr.isNominal() && !classAttr.isString()) {
            throw classAttr + ' must be nominal';
        } else {
            let classAttrIndex = this.attrs.findIndex(attr => attr == classAttr);
            if (~classAttrIndex) {
                this.classAttr = this.attrs[classAttrIndex];
                this.classAttrIndex = classAttrIndex;
                return this;
            }
            throw classAttr + ' is not exists';
        }
    }
    addInstance(instance) {
        let instanceObj = new Instance(instance);
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
            if (instance.isMissing(attr)) {
                continue;
            } else {
                if (attr.isNominal() || attr.isString()) {
                    if (!attr.values.has(instance.getAttrValue(attr))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
module.exports = Instances;