let OneRClassifier = require('./OneRClassifier.js');
let Instances = require('./Instances.js');
let Instance = require('./Instance.js');
let Attribute = require('./Attribute.js');
//oneR分类器
let classifer = new OneRClassifier();
//定义属性
let attr1 = new Attribute('outlook', new Set(['sunny', 'overcast', 'rainy']));
let attr2 = new Attribute('temperature', Number);
let attr3 = new Attribute('humidity', Number);
let attr4 = new Attribute('windy', new Set([true, false]));
let attr5 = new Attribute('play', new Set([true, false]));
//建表
let instances = new Instances('weather', [attr1, attr2, attr3, attr4, attr5]);
//设置分类属性
instances.setClassAttribute(attr5);
//添加实例
instances.addInstance({
    outlook: 'sunny',
    temperature: 85,
    humidity: 85,
    windy: false,
    play: false
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 80,
    humidity: 90,
    windy: true,
    play: false
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 83,
    humidity: 86,
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 70,
    humidity: 96,
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 68,
    humidity: 80,
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 65,
    humidity: 70,
    windy: true,
    play: false
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 64,
    humidity: 65,
    windy: true,
    play: true
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 72,
    humidity: 95,
    windy: false,
    play: false
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 69,
    humidity: 70,
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 75,
    humidity: 80,
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 75,
    humidity: 70,
    windy: true,
    play: true
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 72,
    humidity: 90,
    windy: true,
    play: true
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 81,
    humidity: 75,
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 71,
    humidity: 91,
    windy: true,
    play: false
});
let testInstance = new Instance({
    outlook: 'overcast',
    temperature: 80,
    humidity: 82,
    windy: false
});
//根据训练集建立分类器，得出分类规则
classifer.buildClassifier(instances);
console.log(classifer.classifyInstance(testInstance));