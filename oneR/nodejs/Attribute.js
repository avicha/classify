class Attribute {
    constructor(attributeName, attributeValues = String) {
        this.attributeName = attributeName;
        this.index = -1;
        if (attributeValues === Number) {
            this.type = Attribute.NUMERIC;
            this.attributeInfo = null;
        } else {
            if (attributeValues === String) {
                this.type = Attribute.STRING;
                this.attributeInfo = [];
            } else {
                if (attributeValues instanceof Set) {
                    this.type = Attribute.NOMINAL;
                    this.attributeInfo = Array.from(attributeValues);
                } else {
                    if ('string' === typeof attributeValues) {
                        let dateFormat = attributeValues;
                        this.type = Attribute.DATE;
                        this.attributeInfo = new DateAttributeInfo(dateFormat);
                    } else {
                        throw 'invalid attributeValues' + attributeValues;
                    }
                }
            }
        }
    }
    setIndex(i) {
        this.index = i;
    }
    isNominal() {
        return this.type === Attribute.NOMINAL;
    }
    isString() {
        return this.type === Attribute.STRING;
    }
    isNumeric() {
        return this.type === Attribute.NUMERIC || this.type === Attribute.DATE;
    }
    isDate() {
        return this.type === Attribute.DATE;
    }
    indexOfValue(attrValue) {
        return this.attributeInfo.indexOf(attrValue);
    }
    addStringValue(string) {
        if (!this.isString()) {
            return -1;
        } else {
            let index = this.attributeInfo.indexOf(string);
            if (~index) {
                return index;
            } else {
                index = this.attributeInfo.length;
                this.attributeInfo.push(string);
                return index;
            }
        }
    }
}
Attribute.NUMERIC = 0;
Attribute.NOMINAL = 1;
Attribute.STRING = 2;
Attribute.DATE = 3;
Attribute.RELATIONAL = 4;
module.exports = Attribute;