let OneRClassifier = require('./OneRClassifier.js');
let Instances = require('./Instances.js');
let classifer = new OneRClassifier();
let instances = new Instances('weather');
instances.setAttributes('outlook', 'temperature', 'humidity', 'windy', 'play');
instances.setClassAttribute('play');
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