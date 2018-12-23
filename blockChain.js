const blockchain = require("./main");


//let jsChain = blockChain.Blockchain();
blockChain.addBlock(new Block("12/25/2017", {amount: 5}));
blockChain.addBlock(new Block("12/26/2017", {amount: 10}));


console.log(JSON.stringify(blockChain, null, 4));
console.log("Is blockchain valid? " + blockChain.checkValid());