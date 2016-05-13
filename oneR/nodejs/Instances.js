let Instance = require('./Instance.js');
class Instances {
    constructor(relation, attrs) {
        this.relation = relation;
        this.attrs = attrs;
        this.numAttributes = attrs.length;
        for (let i = 0; i < this.numAttributes; i++) {
            this.attribute(i).setIndex(i);
        }
        this.classAttr = null;
        this.classAttrIndex = -1;
        this.dataset = [];
    }
    setClassAttribute(classAttr) {
        let classAttrIndex = this.attrs.findIndex(attr => attr == classAttr);
        if (~classAttrIndex) {
            this.classAttr = this.attrs[classAttrIndex];
            this.classAttrIndex = classAttrIndex;
            return this;
        }
        throw new Exception(classAttr + ' is not exists');
    }
    attribute(i) {
        return this.attrs[i];
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
}
module.exports = Instances;