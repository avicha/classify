class newNominalRule {
    constructor(attr, instances) {
        this.classifications = new Map();
        this.correct = 0;
        this.attrResult = new Map();
        for (let attrVal of attr.values) {
            let classValInfo = new Map();
            for (let classVal of instances.classAttr.values) {
                classValInfo.set(classVal, 0);
            }
            this.attrResult.set(attrVal, classValInfo);
        }
        instances.dataset.forEach(instance => {
            let attrVal = instance.get(attr);
            let classVal = instance.get(instances.classAttr);
            this.attrResult.get(attrVal).set(classVal, this.attrResult.get(attrVal).get(classVal) + 1);
        });
        for (let [attrVal, classValInfo] of this.attrResult) {
            let bestVal, count = 0;
            for (let [classVal, classValCount] of classValInfo) {
                if (bestVal === undefined) {
                    bestVal = classVal;
                    count = classValCount;
                } else {
                    if (classValCount > count) {
                        count = classValCount;
                        bestVal = classVal;
                    }
                }
            }
            this.correct += count;
            this.classifications.set(attrVal, bestVal);
        }
    }
}
class OneRClassifier {
    constructor() {
        this.classifyAttr = null;
        this.rule = null;
    }
    newRule(attr, instances) {
        let r = new newNominalRule(attr, instances);
        return r;
    }
    buildClassifier(instances) {
        instances.deleteWithMissingClass();
        instances.attrs.forEach(attr => {
            if (attr != instances.classAttr) {
                let r = this.newRule(attr, instances);
                console.log(r);
                if (!this.rule || r.correct > this.rule.correct) {
                    this.rule = r;
                    this.classifyAttr = attr;
                }
            }
        });
        console.log(this.rule);
    }
    classifyInstance(instance) {

    }
}
module.exports = OneRClassifier;