class Attribute {
    constructor(name, attributeValues = String) {
        this.name = name;
        this.weight = 1;
        if (attributeValues === Number) {
            this.type = Attribute.NUMERIC;
            this.values = [];
        } else {
            if (attributeValues === String) {
                this.type = Attribute.STRING;
                this.values = new Set();
            } else {
                if (attributeValues instanceof Set) {
                    this.type = Attribute.NOMINAL;
                    this.values = attributeValues;
                } else {
                    if (attributeValues === Boolean) {
                        this.type = Attribute.NOMINAL;
                        this.values = new Set([true, false]);
                    } else {
                        if ('string' === typeof attributeValues) {
                            let dateFormat = attributeValues;
                            this.type = Attribute.DATE;
                            this.values = new DateAttributeInfo(dateFormat);
                        } else {
                            throw 'invalid attributeValues' + attributeValues;
                        }
                    }
                }
            }
        }
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
    hasValue(attrValue) {
        return this.values.has(attrValue);
    }
    addStringValue(string) {
        if (!this.isString()) {
            throw this.name + ' is not a string type attribute!';
        } else {
            this.values.add(string);
        }
    }
}
Attribute.NUMERIC = 0;
Attribute.NOMINAL = 1;
Attribute.STRING = 2;
Attribute.DATE = 3;
Attribute.RELATIONAL = 4;
module.exports = Attribute;