let OneRClassifier = require('./OneRClassifier.js');
let Instances = require('./Instances.js');
let Attribute = require('./Attribute.js');
let classifer = new OneRClassifier();
let attr1 = new Attribute('outlook', new Set(['sunny', 'overcast', 'rainy']));
let attr2 = new Attribute('temperature', new Set(['hot', 'mild', 'cool']));
let attr3 = new Attribute('humidity', new Set(['high', 'normal']));
let attr4 = new Attribute('windy', new Set([true, false]));
let attr5 = new Attribute('play', new Set([true, false]));
let instances = new Instances('weather', [attr1, attr2, attr3, attr4, attr5]);
instances.setClassAttribute(attr5);
instances.addInstance({
    outlook: 'sunny',
    temperature: 'hot',
    humidity: 'high',
    windy: false,
    play: false
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 'hot',
    humidity: 'high',
    windy: true,
    play: false
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 'hot',
    humidity: 'high',
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 'mild',
    humidity: 'high',
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 'cool',
    humidity: 'normal',
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 'cool',
    humidity: 'normal',
    windy: true,
    play: false
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 'cool',
    humidity: 'normal',
    windy: true,
    play: true
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 'mild',
    humidity: 'high',
    windy: false,
    play: false
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 'cool',
    humidity: 'normal',
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 'mild',
    humidity: 'normal',
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'sunny',
    temperature: 'mild',
    humidity: 'normal',
    windy: true,
    play: true
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 'mild',
    humidity: 'high',
    windy: true,
    play: true
});
instances.addInstance({
    outlook: 'overcast',
    temperature: 'hot',
    humidity: 'normal',
    windy: false,
    play: true
});
instances.addInstance({
    outlook: 'rainy',
    temperature: 'mild',
    humidity: 'high',
    windy: true,
    play: false
});
classifer.buildClassifier(instances);
// console.log(instances.dataset);