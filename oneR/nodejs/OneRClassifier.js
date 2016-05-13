class newNominalRule {
    constructor(attr, instances) {
        this.classifications = new Map();
        this.correct = 0;
        this.attrResult = new Map();
        for (let attrVal of attr.attributeInfo) {
            let classValInfo = new Map();

            for (let classVal of instances.classAttr.attributeInfo) {
                classValInfo.set(classVal, 0);
            }
            this.attrResult.set(attrVal, classValInfo);
        }
        instances.dataset.forEach(instance => {
            let attrVal = instance.getAttrValue(attr);
            let classVal = instance.getAttrValue(instances.classAttr);
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
        //分类属性
        this.classifyAttr = null;
        //分类规则
        this.rule = null;
    }
    newRule(attr, instances) {
        let r;
        if (attr.isNominal()) {
            r = new newNominalRule(attr, instances);
        }
        return r;
    }
    /**
     * [buildClassifier 根据训练集创建分类器]
     * @param  {[type]} instances [训练集]
     * @return {[type]}           [description]
     */
    buildClassifier(instances) {
        //清洗数据
        instances.deleteWithMissingClass();
        //对每个非分类属性，计算利用该分类进行分类的规则的准确率，记录准确率最高的规则和属性。
        instances.attrs.forEach(attr => {
            if (attr != instances.classAttr) {
                //得到一条规则，根据attr属性对instances进行分类
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