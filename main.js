const SHA256 = require("crypto-js/sha256"); //Library for generating the hash

class Block 
{
	constructor(index, timestamp, data) 
	{
		this.index = index; //The index communicates where in the chain the block is located
		this.timestamp = timestamp; //Signifies when the block is being made
		this.data = data;
		this.previousHash = "0";
		this.hash = this.calculateHash();
		this.nonce = 0; //critical to building in a mining mechanism for our blockchain
	}

	/**
	 * This function is used for calculating the transaction hash map
	 * whenever we are creating a block in the system
	 */
	calculateHash() 
	{
		return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
	}

	/**
	 * This function is being for mining blocks based on the difficulity level
	 * The higher the difficulity level, the time consumption level will increase
	 */
	mineBlock(difficulty) 
	{

	}
}

class Blockchain
{
	constructor() 
	{
		this.chain = [this.createGenesis()];
	}

	/**
	 * As we all know, Genesis block is known as the first block of a block chain structure
	 * Here you 
	 */
	createGenesis() 
	{
		let timeStamp = Date.now();
		return new Block(0, timeStamp, "Genesis block", "0")
	}

	/**
	 * This returns the last block of the block chain
	 * that is created in the transaction
	 */
	latestBlock() 
	{
		return this.chain[this.chain.length - 1]
	}

	/**
	 * This function is being used for adding the new bliock in the functio
	 */
	addBlock(newBlock)
	{
		newBlock.previousHash = this.latestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	/**
	 * This is used to check the integrity of the blockchain and to detect whether or not anything has been tampered with.
	 * There are two parts of our loop, the first is matching currentBlock.hash with currentBlock.calculateHash() and the other is matching 
	 * currentBlock.previousHash with previousBlock.hash. The former is used to check whether or currentBlock’s info has been tampered with without updating 
	 * currentBlock.hash The latter is used to check whether or not a previousBlock has been tampered with.
	 */
	checkValid() 
	{
		for(let index = 1; index < this.chain.length; index++) 
		{
			const currentBlock = this.chain[index];
			const previousBlock = this.chain[index - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) 
			{
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) 
			{
				return false;
			}
		}

		return true;
	}
}

/**
 * new keyword is used for calling the constructor function, Constructor function don't have any return statement
 * So if u miss new - it will expect it to a normal function and might lead to error
 * @type {Blockchain}
 */
let jsChain = new Blockchain();

let amount = 10;
for (var index = 1 ; index <= 10; index ++) 
{
	let timeStamp = Date.now();
	amount += 5;

	jsChain.addBlock(new Block(index, timeStamp, {amount: amount}));
}


console.log(JSON.stringify(jsChain, null, 4)); // 4 denotes tab index for rendering thw view in proper json structure
console.log("Is blockchain valid? " + jsChain.checkValid());