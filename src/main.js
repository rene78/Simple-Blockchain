//const SHA256 = require("crypto-js/sha256");
import SHA256 from 'crypto-js/sha256';
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        //return Math.random();
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
/*----------------------------*/
class Blockchain{
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  
  createGenesisBlock() {
    return new Block(0, "01/01/2019", "Genesis block", "0");
  }
  
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
/*----------------------------*/
let savjeeCoin = new Blockchain();
//savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
//savjeeCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

document.getElementById("output").innerText = JSON.stringify(savjeeCoin);
console.log(savjeeCoin);
//console.log(savjeeCoin.chain[1].data);


function addTransaction() {
  let enteredValue = document.getElementById("amount").value;
  let currentChainLength = savjeeCoin.chain.length;
  let date = new Date().toLocaleTimeString();

  savjeeCoin.addBlock(new Block(currentChainLength, date, { amount: enteredValue }));
  document.getElementById("output").innerText = JSON.stringify(savjeeCoin);
}
window.addTransaction = addTransaction; //necessary because webpack does not make function available on global scope