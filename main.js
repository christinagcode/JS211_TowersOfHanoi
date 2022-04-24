'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?

// The function printStacks is to print in the console "a: " what are on the stacks a, b, and c. 
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
} 


// Next, what do you think this function should do?

// This function moves a piece from one to another.
const movePiece = (startStack, endStack) => {
  // Your code here

  // console.log(stacks.a, "**************************")
  // console.log(stacks[startStack], "**************************")
let startStackArr = stacks[startStack]
let endStackArr = stacks[endStack]

  // We use the pop methond here to remove the last string in the a array
  let move = startStackArr.pop();
  // With the push methond we place that string to another array
  endStackArr.push(move);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
// We're moving a single string from a full array
  console.log(stacks[startStack].slice(-1), '******')
  console.log(stacks[endStack].slice(-1), '******')
  if(stacks[endStack].length == 0){
    return true;
  } 
  if(stacks[startStack].slice(-1) > stacks[endStack].slice(-1)) {
    console.log('invalid move')
    return false;
  }
  // if(stacks[startStack].length > 0) {
  //     return true;
  //   }
    // This moves the string to an empty array
  // With the slice methond this ensures the string in the endStack is greater than the string we're moving.
    // if(endStack.slice(-1) > startStack.slice(-1)){
    // return true;
    // // If conditions aren't met it'll console out "Invalid move!"
    // }
     else {
    console.log("Invalid move!")
    return false;
    }
}

// What is a win in Towers of Hanoi? When should this function run?
// Player wins when all strings in the array of B and C are stracked in order [4, 3, 2, 1]
// Before the other functions
const checkForWin = () => {
  // Your code here

// If stacks b and c have all 4 strings player wins. If not player loses.
 if (stacks['b'].length == 4 || stacks['c'].length == 4){
   return true;
 } else {
   return false
 }
}
// When is this function called? What should it do with its argument?
/// ************************************************ HELP ***************************************************
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  
 // isLegal function checks the move is valid.
if (isLegal(startStack, endStack)){
  // movePiece moves the string if invalid it prompts the message
  movePiece(startStack, endStack)
} else {
  console.log("Invalid Move!");
} 
// if wont it prompts this message
if(checkForWin()){
  console.log("You win!");
}
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
