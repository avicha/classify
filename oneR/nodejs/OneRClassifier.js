let makeClassValInfoMap = instances => {
    let classValInfo = new Map();
    for (let classVal of instances.classAttr.values) {
        classValInfo.set(classVal, 0);
    }
    return classValInfo;
};
let analysisAttrResult = attrResult => {
    let correct = 0,
        classifications = new Map();
    for (let [attrVal, classValInfo] of attrResult) {
        let res = maxClassValue(classValInfo);
        correct += res.count;
        classifications.set(attrVal, res.bestVal);
    }
    return {
        correct: correct,
        classifications: classifications
    };
};
let maxClassValue = classValInfo => {
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
    return {
        bestVal: bestVal,
        count: count
    }
}
class OneRClassifier {
    constructor() {
        //分类属性
        this.classifyAttr = null;
        //分类规则
        this.rule = null;
        this.minBucketSize = 6;
    }
    newNominalRule(attr, instances) {

        this.classifications = new Map();
        this.correct = 0;
        this.attrResult = new Map();
        for (let attrVal of attr.values) {
            let classValInfo = makeClassValInfoMap(instances);
            this.attrResult.set(attrVal, classValInfo);
        }
        instances.dataset.forEach(instance => {
            let attrVal = instance.getAttrValue(attr);
            let classVal = instance.getClassValue();
            let oldCount = this.attrResult.get(attrVal).get(classVal);
            this.attrResult.get(attrVal).set(classVal, oldCount + 1);
        });
        let res = analysisAttrResult(this.attrResult);
        this.correct = res.correct;
        for (let [key, value] of res.classifications) {
            this.classifications.set(key, value);
        }
        return {
            correct: this.correct,
            classifications: this.classifications,
            attrResult: this.attrResult
        }
    }
    newNumericRule(attr, instances) {
            this.classifications = new Map();
            this.distributions = [];
            this.correct = 0;
            this.attrResult = new Map();
            this.attrResult.set(null, makeClassValInfoMap(instances));
            let dataset = instances.dataset.filter((instance, i) => {
                let classVal = instance.getClassValue();
                if (instance.isMissing(attr)) {
                    let oldCount = this.attrResult.get(null).get(classVal);
                    this.attrResult.get(null).set(classVal, oldCount + 1);
                    return false;
                } else {
                    return true;
                }
            });
            dataset.sort((a, b) => {
                let aAttrVal = a.getAttrValue(attr);
                let bAttrVal = b.getAttrValue(attr);
                return aAttrVal - bAttrVal;
            });
            let lastValue = 0;
            let distribution = null;
            dataset.forEach((instance, i) => {
                let classVal = instance.getClassValue();
                let attrVal = instance.getAttrValue(attr);
                if (!i || attrVal > lastValue) {
                    let classValInfo = makeClassValInfoMap(instances);
                    let originAttrVal = attrVal;
                    if (i) {
                        attrVal = (attrVal + lastValue) / 2;
                    }
                    lastValue = originAttrVal;
                    distribution = {
                        attrVal: attrVal,
                        classValInfo: classValInfo
                    }
                    this.distributions.push(distribution);
                }
                let oldCount = distribution.classValInfo.get(classVal);
                distribution.classValInfo.set(classVal, oldCount + 1);
            });
            this.distributions = new Set(this.distributions);
            let oldDist = null;
            for (distribution of this.distributions) {
                if (oldDist) {
                    if ((maxClassValue(distribution.classValInfo).bestVal == maxClassValue(oldDist.classValInfo).bestVal) || (maxClassValue(oldDist.classValInfo).count < this.minBucketSize)) {
                        for (let [classVal, classValCount] of distribution.classValInfo) {
                            distribution.classValInfo.set(classVal, classValCount + oldDist.classValInfo.get(classVal));
                        }
                        this.distributions.delete(oldDist);
                    } else {
                        this.attrResult.set(distribution.attrVal, oldDist.classValInfo);
                    }
                }
                oldDist = distribution;
            }
            this.attrResult.set(Infinity, oldDist.classValInfo);
            let res = analysisAttrResult(this.attrResult);
            this.correct = res.correct;
            for (let [key, value] of res.classifications) {
                this.classifications.set(key, value);
            }
            return {
                correct: this.correct,
                classifications: this.classifications,
                attrResult: this.attrResult
            }
        }
        //根据属性创建一条规则
    newRule(attr, instances) {
            let r;
            //如果是条目属性
            if (attr.isNominal() || attr.isString()) {
                r = this.newNominalRule(attr, instances);
            } else {
                r = this.newNumericRule(attr, instances);
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
        this.instances = instances.deleteWithMissingClass();
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
        if (!this.rule) {
            return {
                state: 1,
                msg: 'unknown rule for classify the instance,please buildClassifier first!',
            };
        } else {
            if (this.instances.checkInstance(instance)) {
                let classVal = instance.getAttrValue(this.classifyAttr);
                if (this.classifyAttr.isNominal() || this.classifyAttr.isString()) {
                    if (this.rule.classifications.has(classVal)) {
                        return {
                            state: 0,
                            msg: 'classify success.',
                            result: this.rule.classifications.get(classVal)
                        };
                    } else {
                        if (instance.isMissing(this.classifyAttr)) {
                            return {
                                state: 0,
                                msg: 'classifyAttr is missing',
                                result: null
                            };
                        } else {
                            return {
                                state: 3,
                                msg: 'classify attribute value invalid.'
                            };
                        }
                    }
                } else {
                    if (instance.isMissing(this.classifyAttr)) {
                        return {
                            state: 0,
                            msg: 'classifyAttr is missing',
                            result: null
                        };
                    } else {
                        for (let [key, value] of this.rule.classifications) {
                            if (key != null && classVal < key) {
                                return {
                                    state: 0,
                                    msg: 'classify success.',
                                    result: value
                                }
                            }
                        }

                    }
                }
            } else {
                return {
                    state: 4,
                    msg: 'instance is not compatible with this dataset.'
                };
            }
        }
    }
    setOptions(opts = {}) {
        if (opts.minBucketSize && !isNaN(parseInt(opts.minBucketSize))) {
            this.minBucketSize = opts.minBucketSize;
        }
    }
}
module.exports = OneRClassifier;