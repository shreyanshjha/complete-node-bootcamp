
// module.exports
const cal = require('./test-module1');
const calc1 = new cal();
console.log(calc1.add(3, 2));

// exports
//const calc2 = require('./test-module2');
const {add, subtract, multiply, divide} = require('./test-module2');
console.log(multiply(3, 2));
console.log(add(3, 1));

// Caching
require('./test-module3')();
require('./test-module3')();
require('./test-module3')();

