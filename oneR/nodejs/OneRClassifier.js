//生成每个分类结果对应的出现数量的map
let makeClassValInfoMap = instances => {
    let classValInfo = new Map();
    for (let classVal of instances.classAttr.values) {
        classValInfo.set(classVal, 0);
    }
    return classValInfo;
};
//分析属性的每个值的结果，返回属性的每个值最大可能的分类结果、正确次数、分析结果，出现属性缺失时分类结果
let analysisAttrResult = attrResult => {
    let correct = 0,
        classifications = new Map(),
        missingValueClass;
    for (let [attrVal, classValInfo] of attrResult) {
        let res = maxClassValue(classValInfo);
        classifications.set(attrVal, res.bestVal);
        if (attrVal == null) {
            //如果出现缺失属性，则记录属性缺失时出现最多的分类
            if (res.count) {
                missingValueClass = res.bestVal;
            } else {
                //否则从规则中去掉缺失属性的分类结果
                attrResult.delete(attrVal);
                classifications.delete(attrVal);
            }
        }
        correct += res.count;
    }
    return {
        correct: correct,
        classifications: classifications,
        attrResult: attrResult,
        missingValueClass: missingValueClass
    };
};
//计算每个分类结果出现次数中的最多出现结果和出现次数
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
    //定义分类器
class OneRClassifier {
    constructor() {
            //分类属性
            this.classifyAttr = null;
            //分类规则
            this.rule = null;
            //最小桶容量，针对数字范围分类时
            this.minBucketSize = 6;
        }
        //创建一个名目属性规则
    newNominalRule(attr, instances) {
        let attrResult = new Map();
        //初始化这个属性的每一个属性值对应的结果次数为0
        for (let attrVal of attr.values) {
            let classValInfo = makeClassValInfoMap(instances);
            attrResult.set(attrVal, classValInfo);
        }
        //累加这个属性的每一个属性值对应的结果次数
        instances.dataset.forEach(instance => {
            let attrVal = instance.getAttrValue(attr);
            let classVal = instance.getClassValue();
            let oldCount = attrResult.get(attrVal).get(classVal);
            attrResult.get(attrVal).set(classVal, oldCount + 1);
        });
        //分类结果并返回规则结论
        let res = analysisAttrResult(attrResult);
        return res;
    }
    newNumericRule(attr, instances) {
            let distributions = [];
            let attrResult = new Map();
            //初始化缺失值的分类结果出现次数
            attrResult.set(null, makeClassValInfoMap(instances));
            //过滤掉缺失值进行断点计算
            let dataset = instances.dataset.filter((instance, i) => {
                if (instance.isMissing(attr)) {
                    let classVal = instance.getClassValue();
                    let oldCount = attrResult.get(null).get(classVal);
                    attrResult.get(null).set(classVal, oldCount + 1);
                    return false;
                } else {
                    return true;
                }
            });
            //如果只有缺失值，则没法计算
            if (!dataset.length) {
                throw 'Only missing values in the training data!';
            }
            //先按照每个数值升序排序
            dataset.sort((a, b) => {
                let aAttrVal = a.getAttrValue(attr);
                let bAttrVal = b.getAttrValue(attr);
                return aAttrVal - bAttrVal;
            });
            //上一个断点
            let lastValue = 0;
            //当前分类
            let distribution = null;
            //遍历数据集
            dataset.forEach((instance, i) => {
                //当前实例分类
                let classVal = instance.getClassValue();
                //当前实例属性值
                let attrVal = instance.getAttrValue(attr);
                //如果是第一个实例或者发现下一个分类点，如果不是第一个实例并且当前实例和上一个实例数值相同，直接累加结果分类计数即可。
                if (!i || attrVal > lastValue) {
                    let classValInfo = makeClassValInfoMap(instances),
                        breakpoint;
                    //如果不是第一个实例，说明当前实例的属性值比上一个点的属性值要大，则取两点的中点作为断点
                    if (i) {
                        breakpoint = (attrVal + lastValue) / 2;
                    } else {
                        breakpoint = attrVal;
                    }
                    lastValue = attrVal;
                    //把当前实例之前的断点的分类结果初始化，并保存断点分布
                    distribution = {
                        attrVal: breakpoint,
                        classValInfo: classValInfo
                    }
                    distributions.push(distribution);
                }
                //当前断点分布的分类结果累加
                let oldCount = distribution.classValInfo.get(classVal);
                distribution.classValInfo.set(classVal, oldCount + 1);
            });
            //把断点数组变成集合，方便合并删除而已
            distributions = new Set(distributions);
            //上一个断点
            let oldDist = null;
            //遍历断点
            for (distribution of distributions) {
                if (oldDist) {
                    //如果当前断点的分类跟上一个断点的分类一样或者上一个断点的分类的桶容量还未达到最小桶容量
                    if ((maxClassValue(distribution.classValInfo).bestVal == maxClassValue(oldDist.classValInfo).bestVal) || (maxClassValue(oldDist.classValInfo).count < this.minBucketSize)) {
                        //合并两个断点到新断点，删除上一个断点
                        for (let [classVal, classValCount] of distribution.classValInfo) {
                            distribution.classValInfo.set(classVal, classValCount + oldDist.classValInfo.get(classVal));
                        }
                        distributions.delete(oldDist);
                    } else {
                        //否则，说明出现新的断点，所以记录上一个断点段的结果分布到断点
                        attrResult.set(distribution.attrVal, oldDist.classValInfo);
                    }
                }
                //把当前断点当做上一个断点
                oldDist = distribution;
            }
            //添加无穷大的断点
            attrResult.set(Infinity, oldDist.classValInfo);
            let res = analysisAttrResult(attrResult);
            return res;
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
        this.rule = null;
        //清洗数据
        let data = instances.deleteWithMissingClass();
        if (data.numAttributes == 1) {
            console.error('Cannot build model (only class attribute present in data!), using ZeroR model instead!');
            this.zeroR = new ZeroRClassifier();
            this.zeroR.buildClassifier(data);
        } else {
            this.zeroR = null;
        }
        //对每个非分类属性，计算利用该分类进行分类的规则的准确率，记录准确率最高的规则和属性。
        data.attrs.forEach(attr => {
            if (attr != data.classAttr) {
                //得到一条规则，根据attr属性对instances进行分类
                let r = this.newRule(attr, data);
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
            //如果没有其他属性学习，则直接判断过去实例出现最多的分类
            if (this.zeroR) {
                return this.zeroR.classifyInstance(instance);
            }
            //分类属性的值
            let classVal = instance.getAttrValue(this.classifyAttr);
            //如果分类属性丢失，则采用zeroR分类器进行分类
            if (instance.isMissing(this.classifyAttr)) {
                //如果分类属性出现过缺失值，则返回缺失值中出现次数最多的分类
                if (this.rule.missingValueClass != null) {
                    return {
                        state: 0,
                        msg: 'classifyAttr is missing',
                        result: this.rule.missingValueClass
                    };
                } else {
                    //缺失值出现在测试集中，但训练集没有出现过，所以不知道分类结果
                    return {
                        state: 1,
                        msg: 'unknown class'
                    };
                }
            }
            //如果属性是枚举类型或者字符串类型
            if (this.classifyAttr.isNominal() || this.classifyAttr.isString()) {
                //如果可以找到规则对应的分类，返回分类结果
                if (this.rule.classifications.has(classVal)) {
                    return {
                        state: 0,
                        msg: 'classify success.',
                        result: this.rule.classifications.get(classVal)
                    };
                } else {
                    //没有出现过这种属性值，所以判断不了分类
                    return {
                        state: 2,
                        msg: 'classify attribute value invalid or never occurs.'
                    };

                }
            } else {
                if (isNaN(Number(classVal))) {
                    return {
                        state: 3,
                        msg: 'number attribute expect.'
                    };
                } else {
                    //否则如果是数字类型，则判断断点breakpoints
                    for (let [key, value] of this.rule.classifications) {
                        if (classVal < key) {
                            return {
                                state: 0,
                                msg: 'classify success.',
                                result: value
                            }
                        }
                    }
                }
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