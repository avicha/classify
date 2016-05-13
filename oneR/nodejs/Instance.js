let Attribute = require('./Attribute.js');
class Instance {
    constructor(obj) {
        this.obj = obj;
        this.attrValues = [];
    }
    setDataset(dataset) {
        this.dataset = dataset;
        for (let i = 0; i < this.numAttributes(); i++) {
            let attr = this.attribute(i);
            var attrValue = this.obj[attr.attributeName];
            if (attrValue === null) {
                this.attrValues[i] = NaN;
            } else {
                switch (attr.type) {
                    case Attribute.NOMINAL:
                        let index = attr.indexOfValue(attrValue);
                        if (~index) {
                            this.attrValues[i] = index;
                        } else {
                            throw 'nominal value not declared in header';
                        }
                        break;
                    case Attribute.NUMERIC:
                        attrValue = Number(attrValue);
                        if (isNaN(attrValue)) {
                            throw 'number expected';
                        } else {
                            this.attrValues[i] = attrValue;
                        }
                        break;
                    case Attribute.STRING:
                        this.attrValues[i] = attr.addStringValue(attrValue);
                        break;
                }
            }
        }
    }
    dataset() {
        return this.dataset;
    }
    numAttributes() {
        return this.dataset.numAttributes;
    }
    classIndex() {
        return this.dataset.classAttrIndex;
    }
    classAttribute() {
        return this.dataset.classAttr;
    }
    classIsMissing() {
        return this.value(this.classAttribute()) == NaN;
    }
    attribute(i) {
        return this.dataset.attribute(i);
    }
    value(attr) {
        if (attr instanceof Attribute) {
            return this.attrValues[attr.index];
        } else {
            return this.attrValues[attr];
        }
    }
    getAttrValue(attr) {
        return this.obj[attr.attributeName];
    }
}
module.exports = Instance;