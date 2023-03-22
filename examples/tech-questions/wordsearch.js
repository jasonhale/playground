/*
After catching your classroom students cheating before, you realize your students are getting craftier and hiding words in 2D grids of letters. The word may start anywhere in the grid, and consecutive letters can be either immediately below or immediately to the right of the previous letter.

Given a grid and a word, write a function that returns the location of the word in the grid as a list of coordinates. If there are multiple matches, return any one.

grid1 = [
    ['b', 'b', 'b', 'a', 'l', 'l', 'o', 'o'],
    ['b', 'a', 'c', 'c', 'e', 's', 'c', 'n'],
    ['a', 'l', 't', 'e', 'w', 'c', 'e', 'w'],
    ['a', 'l', 'o', 's', 's', 'e', 'c', 'c'],
    ['w', 'o', 'o', 'w', 'a', 'c', 'a', 'w'],
    ['i', 'b', 'w', 'o', 'w', 'w', 'o', 'w']
]
word1_1 = "access"      # [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]
word1_2 = "balloon"     # [(0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (1, 7)]
word1_3 = "wow"
word1_4 = "sec"         # [(3, 4), (3, 5), (3, 6)] OR 
                        # [(3, 4), (3, 5), (4, 5)]    

grid2 = [
  ['a'],
]
word2_1 = "a"

grid3 = [
    ['c', 'a'],
    ['t', 't'],
    ['h', 'a'],
    ['a', 'c'],
    ['t', 'g']
]
word3_1 = "cat"
word3_2 = "hat"

grid4 = [
    ['c', 'c', 'x', 't', 'i', 'b'],
    ['c', 'a', 't', 'n', 'i', 'i'],
    ['a', 'x', 'n', 'x', 'p', 't'],
    ['t', 'x', 'i', 'x', 't', 't']
]
word4_1 = "catnip"      # [(1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)] OR
                        # [(0, 1), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)]


All test cases:

search(grid1, word1_1) => [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]
search(grid1, word1_2) => [(0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (1, 7)]
search(grid1, word1_3) => [(4, 3), (5, 3), (5, 4)] OR 
                          [(5, 2), (5, 3), (5, 4)] OR 
                          [(5, 5), (5, 6), (5, 7)]
search(grid1, word1_4) => [(3, 4), (3, 5), (3, 6)] OR
                          [(3, 4), (3, 5), (4, 5)]  

search(grid2, word2_1) => [(0, 0)]

search(grid3, word3_1) => [(0, 0), (0, 1), (1, 1)]
search(grid3, word3_2) => [(2, 0), (3, 0), (4, 0)]

search(grid4, word4_1) => [(1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)] OR
                          [(0, 1), (1, 1), (1, 2), (1, 3), (1, 4), (2, 4)]

Complexity analysis variables:

r = number of rows
c = number of columns
w = length of the word

*/


/**
 * find first letter
 *    if found & there are more -> next letter
 *      look right
 *        if this letter is next letter
 *          there are more letters in word
 *            next letter
 *          no more letters in word
 *            report SUCCESS
 *        else report FAILURE
 *      else look down
 *        if this letter is next letter
 *          there are more letters in word
 *            next letter
 *          no more letters in word
 *            report SUCCESS
 *        else report FAILURE
 *      else FAILURE
 * if not successful and haven't sarched the whole grid for first letter
 *    find next first letter
 */

 function findFirst(grid, letter, start) {
  let coord;
  let count = start?.y || 0;
  while(!coord && count < grid.length) {
    const row = grid[count];
    let idx = (start?.y === count) ? 
      row.indexOf(letter, start.x)
      :
      row.indexOf(letter, 0);
    if (idx > -1) {
      coord = { x: idx, y: count };
    }
    count++; // next row
  }

  return coord;
}

function search(searchGrid, searchWord) {
  let output = [];
  const gridFinalCoords = { x: searchGrid[0].length - 1, y: searchGrid.length -1 };
  const getLetterAt = (x, y) => searchGrid[y][x];

  const getNextIndex = ({ x, y }) => {
    let row = y;
    let col = x + 1;
    if (col > gridFinalCoords.x) {
      col = 0;
      row = y + 1;
    }
    if (row > gridFinalCoords.y) {
      return false;
    }
    return { x: col, y: row };
  };

  function startLooking(currIndex = { x: 0, y: 0 }) {
    let tryIndex = 0;
    const initialCoord = findFirst(searchGrid, searchWord.at(0), currIndex);
    const nextIndex = getNextIndex(currIndex);

    console.log({ initialCoord, nextIndex });

    // if at the end of the grid, return a not found.
    if (!nextIndex) {
      return undefined;
    }
    if (!initialCoord) {
      startLooking(nextIndex);
    }
    if (searchWord.length === 1) return [initialCoord]; // that's all. return early.

    let coordArr = findWord(initialCoord, 0, [initialCoord]);

    if (coordArr === 'FIND FAIL') {
      startLooking(nextIndex);
    }
    if (coordArr === 'OUT OF BOUNDS') {
      return 'ERROR: word not found';
    }

    // if all word was found...
    return coordArr;
  }

  function findWord(startCoord, startLetterIndex, outputArr) {
    const thisWordLetterIndex = startLetterIndex + 1;
    const thisWordLetter = searchWord.at(thisWordLetterIndex);
    let thisOutput;
    let outOfBoundsX = false;
    let outOfBoundsY = false;
    // if (!nextWordLetter) return 'DONE';
    
    console.log('check', { startCoord, startLetterIndex, outputArr});

    const rightCoord = { x: startCoord.x + 1, y: startCoord.y};
    if ((rightCoord.x <= gridFinalCoords.x)) {
      // if possible, check letter to right.
      const rightLetter = getLetterAt(rightCoord.x, rightCoord.y);
      if (rightLetter === thisWordLetter) {
        // FOUND
        thisOutput = [...outputArr, rightCoord];
        // if all letters of the word have been found, return coords.
        if (searchWord.length === (thisWordLetterIndex + 1)) {
          // DONE!
          return thisOutput;
        }
        const wordRight = findWord(rightCoord, thisWordLetterIndex, thisOutput);
        console.log('wordRight', wordRight);
        if (wordRight.length === searchWord.length) {
          return wordRight;
        }
      }
    } else {
      outOfBoundsX = true
    }

    const downCoord = { x: startCoord.x, y: startCoord.y + 1 };
    if (downCoord.y <= gridFinalCoords.y) {
      const downLetter = getLetterAt(downCoord.x, downCoord.y);
      if (downLetter === thisWordLetter) {
        thisOutput = [...outputArr, downCoord];

        if (searchWord.length === (thisWordLetterIndex + 1)) {
          return thisOutput;
        }

        const wordDown = findWord(downCoord, thisWordLetterIndex, thisOutput);
        if (wordDown.length === searchWord.length) {
          return wordDown;
        }
      }
    } else {
      outOfBoundsY = true;
    }

    if (outOfBoundsX && outOfBoundsY) return 'OUT OF BOUNDS';

    return 'FIND FAIL';
  }

  output = startLooking();
  
  if (!output.length) return undefined;
  return output;
}


/** */

var grid1 = [
  ['b', 'b', 'b', 'a', 'l', 'l', 'o', 'o'],
  ['b', 'a', 'c', 'c', 'e', 's', 'c', 'n'],
  ['a', 'l', 't', 'e', 'w', 'c', 'e', 'w'],
  ['a', 'l', 'o', 's', 's', 'e', 'c', 'c'],
  ['w', 'o', 'o', 'w', 'a', 'c', 'a', 'w'],
  ['i', 'b', 'w', 'o', 'w', 'w', 'o', 'w']
];
word1_1 = "access"      // [(1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 4)]
word1_2 = "balloon"     // [(0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (1, 7)]
word1_3 = "wow"
word1_4 = "sec"         // [(3, 4), (3, 5), (3, 6)] OR 
                        // [(3, 4), (3, 5), (4, 5)]    


console.log(search(grid1, word1_1));


