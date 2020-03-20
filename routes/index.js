var express = require('express');
var router = express.Router();
const CryptoJS = require('crypto-js')

const {
  getLength,
  generateNextBlock,
  addBlock,
  addChain,
  getBlock,
  checkBlock,
  Block,
  blockchain // 区块链
} = require('./block.js')

// 生成区块（第一个参数是区块内容，第二个参数是上一个区块）
function generateBlock(blockData, previousBlock) {
  const nextIndex = previousBlock.index + 1
  const nextTimeStamp = new Date().getTime()
  const nextHash = CryptoJS.SHA256(nextIndex + previousBlock.hash + nextTimeStamp + blockData) + ''
  return new Block(nextIndex, previousBlock.hash, nextTimeStamp, blockData, nextHash)
}

/* 记账 */
router.post('/', function(req, res, next) {
  // 获取当前区块链的最后一个区块
  let block = getBlock(getLength() - 1);
  // 生成新的区块，添加到区块链上
  newBlock = generateBlock(req.body.content, block)
  // 添加区块
  addBlock(newBlock)
  // 获取区块长度
  let length = getLength()
  // 生成一个数组
  let blocks = []
  // 将区块的内容循环添加到数组中
  for(let i = 0; i < length; ++i) {
    blocks.push(getBlock(i).data)
  }
  // 返回区块内容数组
  res.status(200)
  res.json(blocks)
});

module.exports = router;




// // 循环打印区块
// function printBlockChain() {
//   let length = getLength(),
//     blocks = []
//   for(let i = 0; i < length; ++i) {
//     blocks.push(getBlock(i))
//   }
//   console.table(blocks)
// }

// let aBlock = null;

// addBlock(generateNextBlock('a'))
// aBlock = getBlock(getLength() - 1)

// addBlock(generateNextBlock('b'))
// printBlockChain()

// setTimeout(() => {
//   let blockchain = [],
//     newBlock = null
  
//   newBlock = generateBlock('B', aBlock)
//   blockchain.push(newBlock)
//   newBlock = generateBlock('C', newBlock)
//   blockchain.push(newBlock)

//   addChain(blockchain)
//   printBlockChain()
// }, 1000)
