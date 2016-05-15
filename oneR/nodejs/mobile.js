let OneRClassifier = require('./OneRClassifier.js');
let Instances = require('./Instances.js');
let Instance = require('./Instance.js');
let Attribute = require('./Attribute.js');
//oneR分类器
let classifer = new OneRClassifier();
//定义属性
let attr1 = new Attribute('rom', new Set(['128G', '64G', '32G', '16G', '8G', '4G', '2G', '1G']));
let attr2 = new Attribute('ram', new Set(['4G', '3G', '2G', '1G', '512M']));
let attr3 = new Attribute('isDoubleCardSupport', Boolean);
let attr4 = new Attribute('price', Number);
let attr5 = new Attribute('core', new Set([1, 2, 4, 6, 8, 10]));
let attr6 = new Attribute('width', String);
let attr7 = new Attribute('height', String);
let attr8 = new Attribute('brand', String);
//建表
let instances = new Instances('mobile', [attr1, attr2, attr3, attr4, attr5, attr6, attr7, attr8]);
//设置分类属性
instances.setClassAttribute(attr8);
//添加实例
instances.addInstance({
    rom: '64G',
    ram: '4G',
    isDoubleCardSupport: true,
    price: 3688,
    core: 8,
    width: 1920,
    height: 1080,
    brand: 'huawei'
});
instances.addInstance({
    rom: '16G',
    ram: '2G',
    isDoubleCardSupport: true,
    price: 899,
    core: 8,
    width: 1920,
    height: 1080,
    brand: 'mi'
});
instances.addInstance({
    rom: '16G',
    ram: '1G',
    isDoubleCardSupport: false,
    price: 4868,
    core: 2,
    width: 1920,
    height: 1080,
    brand: 'apple'
});
instances.addInstance({
    rom: '64G',
    ram: '1G',
    isDoubleCardSupport: false,
    price: 5668,
    core: 2,
    width: 1920,
    height: 1080,
    brand: 'apple'
});
instances.addInstance({
    rom: '16G',
    ram: '2G',
    isDoubleCardSupport: true,
    price: 799,
    core: 4,
    width: 1280,
    height: 720,
    brand: 'huawei'
});
instances.addInstance({
    rom: '64G',
    ram: '2G',
    isDoubleCardSupport: false,
    price: 6286,
    core: 4,
    width: 1920,
    height: 1080,
    brand: 'apple'
});
instances.addInstance({
    rom: '32G',
    ram: '3G',
    isDoubleCardSupport: true,
    price: 1299,
    core: 10,
    width: 1920,
    height: 1080,
    brand: 'le'
});
instances.addInstance({
    rom: '16G',
    ram: null,
    isDoubleCardSupport: false,
    price: 4758,
    core: 2,
    width: 1920,
    height: 1080,
    brand: 'apple'
});
instances.addInstance({
    rom: '16G',
    ram: null,
    isDoubleCardSupport: null,
    price: 3288,
    core: null,
    width: null,
    height: null,
    brand: 'apple'
});
instances.addInstance({
    rom: '16G',
    ram: '2G',
    isDoubleCardSupport: true,
    price: 899,
    core: 4,
    width: 1280,
    height: 720,
    brand: 'huawei'
});
instances.addInstance({
    rom: '16G',
    ram: '3G',
    isDoubleCardSupport: true,
    price: 1999,
    core: 8,
    width: 1920,
    height: 1080,
    brand: 'huawei'
});
instances.addInstance({
    rom: '16G',
    ram: '3G',
    isDoubleCardSupport: true,
    price: 1999,
    core: 8,
    width: 1920,
    height: 1080,
    brand: 'huawei'
});
instances.addInstance({
    rom: '16G',
    ram: '3G',
    isDoubleCardSupport: false,
    price: 1069,
    core: 4,
    width: 1920,
    height: 1080,
    brand: 'mi'
});
instances.addInstance({
    rom: '32G',
    ram: '4G',
    isDoubleCardSupport: true,
    price: 2299,
    core: 10,
    width: 2560,
    height: 1440,
    brand: 'le'
});
instances.addInstance({
    rom: '64G',
    ram: '4G',
    isDoubleCardSupport: true,
    price: 2599,
    core: 10,
    width: 2560,
    height: 1440,
    brand: 'le'
});
instances.addInstance({
    rom: '32G',
    ram: '2G',
    isDoubleCardSupport: true,
    price: 1299,
    core: 6,
    width: 1920,
    height: 1080,
    brand: 'mi'
});
let testInstance = new Instance({
    rom: '16G',
    ram: '2G',
    isDoubleCardSupport: true,
    price: 1199,
    core: 8,
    width: 1280,
    height: 720
});
//根据训练集建立分类器，得出分类规则
classifer.buildClassifier(instances);
console.log(classifer.classifyInstance(testInstance));