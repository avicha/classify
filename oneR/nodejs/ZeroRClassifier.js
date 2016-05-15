class ZeroRClassifier {
    buildClassifier(instances) {
        let valueCountMap = new Map(),
            maxCount = 0;
        for (let classValue of instances.classAttr.values) {
            valueCountMap.set(classValue, 0);
        }
        for (let instance of instances.dataset) {
            if (!instance.classIsMissing()) {
                let value = instance.getClassValue();
                let oldCount = valueCountMap.get(value);
                valueCountMap.set(value, oldCount + instance.weight);
            }
        }
        for (let [value, count] of valueCountMap) {
            if (count > maxCount) {
                maxCount = count;
                this.classValue = value;
            }
        }
    }
    classifyInstance(instance) {
        return this.classValue;
    }
}
module.exports = ZeroRClassifier;