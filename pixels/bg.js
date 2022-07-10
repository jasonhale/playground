var blackmage = [
  [ , , , , , , , , , , , , ,0,0,0,0, ],
  [ , , , , , , , , , , ,0,0,0,1,1,0, ],
  [ , , , , , , , , , ,0,0,1,1,1,2,0, ],
  [ , , , , , , , ,0,0,0,1,1,1,2,0,0, ],
  [ , , , , , ,0,0,0,1,1,1,1,2,2,0, , ],
  [0,0,0,0,0,0,0,1,1,1,1,2,2,2,0,0, , ],
  [0,1,1,1,1,1,1,1,1,2,2,2,2,2,0, , , ],
  [0,0,2,2,2,2,1,1,1,1,2,2,2,2,0, , , ],
  [ ,0,0,0,0,2,2,2,2,1,1,1,2,0,0, , , ],
  [ , , , ,0,0,0,0,2,2,2,2,2,2,0,0, , ],
  [ , , , ,0,1,0,0,0,0,0,2,2,2,2,0,0, ],
  [ , ,0,0,0,1,0,0,1,0,0,0,0,2,2,2,0,0],
  [ ,0,0,3,0,0,0,0,1,0,0,0,0,3,0,2,2,0],
  [ ,0,3,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0],
  [ ,0,3,3,3,0,0,0,3,3,3,3,3,3,3,0, , ],
  [0,0,0,3,3,3,3,3,3,0,0,0,3,3,0,0, , ],
  [0,1,1,0,3,3,3,0,0,3,3,3,3,3,3,0, , ],
  [0,1,1,0,3,3,0,0,0,3,3,3,3,3,3,0, , ],
  [0,0,0,3,3,3,1,1,0,3,3,3,3,3,3,0, , ],
  [ ,0,3,0,3,3,1,1,0,3,3,3,3,3,3,0, , ],
  [ ,0,3,0,3,3,0,0,0,3,3,3,3,3,0,0, , ],
  [ ,0,3,3,0,3,3,3,3,0,3,3,3,3,0, , , ],
  [ ,0,3,3,3,0,3,3,3,0,3,3,3,3,0,0, , ],
  [0,0,3,3,3,3,0,0,3,3,0,3,3,0,3,0,0, ],
  [0,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,0, ],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ]
];

var firesprite_1 = [
  [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0,0, , ],
  [ , , , , , , , , , , , , , , , , , , , , , , , , , , ,0,0,1,1,0, ],
  [ , , , , , , , , , , , , , , , , , , , , , , , , , ,0,1,1,1,2,0, ],
  [ , , , , , , , , , , , , , , , , , , , , , , , ,0,0,1,1,1,2,0, , ],
  [ , , , , , , , , , , , , , , , , , , , , , ,0,0,1,1,1,1,2,2,0, , ],
  [ , , , , , , , , , , , , , , , ,0,0,0,0,0,0,1,1,1,1,2,2,2,0, , , ],
  [ ,4,4, , , ,4,4,4,4,4, , , , , ,1,1,1,1,1,1,1,1,2,2,2,2,2,0, , , ],
  [4,5,5,4,4,4,5,5,5,5,4,4,4,4, , ,0,2,2,2,2,1,1,1,1,2,2,2,2,0, , , ],
  [6,5,6,6,5,5,5,6,6,6,6,5,5,5,5,4, ,0,0,0,2,2,2,2,1,1,1,2,0,0, , , ],
  [5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5, , , , ,0,0,0,0,2,2,2,2,2,2,0, , ],
  [6,5,6,6,5,5,5,6,6,6,6,5,5,5,5,4,0, , ,0,1,0,0,0,0,0,0,2,2,2,2,0, ],
  [5,6,6,5,5,5,6,6,6,6,6,5,5,5,4,0,1,0,0,0,1,0,0,1,0,0,0,0,0,2,2,2,0],
  [4,5,4,4,4,4,5,5,6,5,5,5,5,4,4,4,1,1,3,0,0,0,0,1,0,0,0,0,0,0,0,2,0],
  [ ,4,4,4, , ,4,4,4,4, ,4, , , ,0,1,1,0,0,0,0,0,0,0,0,0,0,0,3,0,0, ],
  [ , , , , , , , , , , , , , , , ,0,0,3,0,0,0,0,0,0,3,3,3,3,0,3,0, ],
  [ , , , , , , , , , , , , , , ,0,1,1,0,3,3,3,3,3,3,0,0,0,0,3,3,0, ],
  [ , , , , , , , , , , , , , , ,0,1,1,0,3,3,3,3,3,3,3,3,3,3,3,3,0, ],
  [ , , , , , , , , , , , , , , ,0,1,0,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,3,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,3,3,0,3,3,3,3,3,3,3,3,3,0, , , ],
  [ , , , , , , , , , , , , , , , ,0,3,3,0,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , ,0,3,0,0,0,0,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,1,1,0,3,0,3,3,3,3,3,3,3,3,3,0, ],
  [ , , , , , , , , , , , , , , ,0,1,1,1,1,0,3,0,0,3,3,3,3,3,3,3,3,0],
  [ , , , , , , , , , , , , , , , ,0,0,0,0, ,0, , ,0,0,0,0,0,0,0,0, ]
];

var firesprite_2 = [
  [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0,0, , ],
  [ , , , , , , , , , , , , , , , , , , , , , , , , , , ,0,0,1,1,0, ],
  [ , , , , , , , , , , , , , , , , , , , , , , , , , ,0,1,1,1,2,0, ],
  [ , , , , , , , , , , , , , , , , , , , , , , , ,0,0,1,1,1,2,0, , ],
  [ ,4,4, , ,4,4,4,4, , , , , , , , , , , , , ,0,0,1,1,1,1,2,2,0, , ],
  [ , , ,4,4, , ,4,4,4,4, ,4,4, , ,0,0,0,0,0,0,1,1,1,1,2,2,2,0, , , ],
  [4, , ,4,5,5,5,4,4,4,5,5,4,4,4,4,1,1,1,1,1,1,1,1,2,2,2,2,2,0, , , ],
  [4,4,5,5,6,6,6,5,5,5,6,6,5,4,4,5,0,2,2,2,2,1,1,1,1,2,2,2,2,0, , , ],
  [4,5,5,6,6,6,6,6,6,6,6,6,6,5,5,6, ,0,0,0,2,2,2,2,1,1,1,2,0,0, , , ],
  [5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6, , , , ,0,0,0,0,2,2,2,2,2,2,0, , ],
  [5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0, , ,0,1,0,0,0,0,0,0,2,2,2,2,0, ],
  [4,5,6,6,6,6,6,6,5,6,6,6,6,6,6,5,1,0,0,0,1,0,0,1,0,0,0,0,0,2,2,2,0],
  [ ,5,5,6,6,6,5,5,5,5,5,6,6,5,5,4,1,1,3,0,0,0,0,1,0,0,0,0,0,0,0,2,0],
  [4,4,5,5,5,5,4,4,4,4,5,5,5,4,4,4,1,1,0,0,0,0,0,0,0,0,0,0,0,3,0,0, ],
  [ , , ,4,4,4, ,4,4,4,4,4,4,4,4, ,0,0,3,0,0,0,0,0,0,3,3,3,3,0,3,0, ],
  [ ,5,5, , , ,5,5, , ,5, ,5,5, ,0,1,1,0,3,3,3,3,3,3,0,0,0,0,3,3,0, ],
  [ , , , , , , , , , , , , , , ,0,1,1,0,3,3,3,3,3,3,3,3,3,3,3,3,0, ],
  [ , , , , , , , , , , , , , , ,0,1,0,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,3,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,3,3,0,3,3,3,3,3,3,3,3,3,0, , , ],
  [ , , , , , , , , , , , , , , , ,0,3,3,0,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , ,0,3,0,0,0,0,3,3,3,3,3,3,3,3,3,0, , ],
  [ , , , , , , , , , , , , , , , ,0,1,1,0,3,0,3,3,3,3,3,3,3,3,3,0, ],
  [ , , , , , , , , , , , , , , ,0,1,1,1,1,0,3,0,0,3,3,3,3,3,3,3,3,0],
  [ , , , , , , , , , , , , , , , ,0,0,0,0, ,0, , ,0,0,0,0,0,0,0,0, ]
];

var mage_spell = [
  [ , , , , , , , , , , , , , ,0,0, , ],
  [ , , , , , , , , , , , ,0,0,1,1,0, ],
  [ , , , , , , , , , , ,0,1,1,1,2,0, ],
  [ , , , , , , , , ,0,0,1,1,1,2,0, , ],
  [ , , , , , , ,0,0,1,1,1,1,2,2,0, , ],
  [ ,0,0,0,0,0,0,1,1,1,1,2,2,2,0, , , ],
  [ ,1,1,1,1,1,1,1,1,2,2,2,2,2,0, , , ],
  [ ,0,2,2,2,2,1,1,1,1,2,2,2,2,0, , , ],
  [ , ,0,0,0,2,2,2,2,1,1,1,2,0,0, , , ],
  [ , , , , ,0,0,0,0,2,2,2,2,2,2,0, , ],
  [ ,0, , ,0,1,0,0,0,0,0,0,2,2,2,2,0, ],
  [0,1,0,0,0,1,0,0,1,0,0,0,0,0,2,2,2,0],
  [0,1,1,3,0,0,0,0,1,0,0,0,0,0,0,0,2,0],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,3,0,0, ],
  [ ,0,0,3,0,0,0,0,0,0,3,3,3,3,0,3,0, ],
  [0,1,1,0,3,3,3,3,3,3,0,0,0,0,3,3,0, ],
  [0,1,1,0,3,3,3,3,3,3,3,3,3,3,3,3,0, ],
  [0,1,0,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ ,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ ,0,3,0,3,3,3,3,3,3,3,3,3,3,3,0, , ],
  [ ,0,3,3,0,3,3,3,3,3,3,3,3,3,0, , , ],
  [ ,0,3,3,0,3,3,3,3,3,3,3,3,3,3,0, , ],
  [0,3,0,0,0,0,3,3,3,3,3,3,3,3,3,0, , ],
  [ ,0,1,1,0,3,0,3,3,3,3,3,3,3,3,3,0, ],
  [0,1,1,1,1,0,3,0,0,3,3,3,3,3,3,3,3,0],
  [ ,0,0,0,0, ,0, , ,0,0,0,0,0,0,0,0, ]
];

var fira_1 = [
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ ,4,4, , , ,4,4,4,4,4, , , , , ],
  [4,5,5,4,4,4,5,5,5,5,4,4,4,4, , ],
  [6,5,6,6,5,5,5,6,6,6,6,5,5,5,5,4],
  [5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5],
  [6,5,6,6,5,5,5,6,6,6,6,5,5,5,5,4],
  [5,6,6,5,5,5,6,6,6,6,6,5,5,5,4,0],
  [4,5,4,4,4,4,5,5,6,5,5,5,5,4,4,4],
  [ ,4,4,4, , ,4,4,4,4, ,4, , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ]
];

var fira_2 = [
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ , , , , , , , , , , , , , , , ],
  [ ,4,4, , ,4,4,4,4, , , , , , , ],
  [ , , ,4,4, , ,4,4,4,4, ,4,4, , ],
  [4, , ,4,5,5,5,4,4,4,5,5,4,4,4,4],
  [4,4,5,5,6,6,6,5,5,5,6,6,5,4,4,5],
  [4,5,5,6,6,6,6,6,6,6,6,6,6,5,5,6],
  [5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
  [5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
  [4,5,6,6,6,6,6,6,5,6,6,6,6,6,6,5],
  [ ,5,5,6,6,6,5,5,5,5,5,6,6,5,5,4],
  [4,4,5,5,5,5,4,4,4,4,5,5,5,4,4,4],
  [ , , ,4,4,4, ,4,4,4,4,4,4,4,4, ],
  [ ,5,5, , , ,5,5, , ,5, ,5,5, ,0]
]

var colors = [
  'black', // 0
  'tanl',  // 1
  'tand',  // 2
  'robe',  // 3
  'redd',  // 4
  'redl',  // 5
  'white'  // 6
];

// var boxShadowArr = [];
// // var test = [];

// blackmage.map((r, i) => {
//   r.map((c, ii) => {
//     // test.push(`${i} ${ii} ${colors[c]}`);
//     if (c == undefined) return;
//     return boxShadowArr.push(`${ii}em ${i}em var(--${colors[c]})`);
//   });
// });

function generateBoxShadow(mtx, xOffset = 0, yOffset = 0) {
  // const bsarr = [];
  let bsarr = '';
  mtx.map((r, i) => {
    const row = [];
    r.map((c, ii) => {
      if (c == undefined) return;
      return row.push(`${ii + xOffset}em ${i + yOffset}em var(--${colors[c]})`);
    });

    let rowString = row.join(', ');
    if (i < r.length) rowString += `
`;

    bsarr += rowString;
  });

  // return bsarr.join(', ');
  return bsarr;
}

// var boxShadow = boxShadowArr.join(', ');

const ans = generateBoxShadow(firesprite_1);

const mageBS = generateBoxShadow(blackmage);
const mage_spellBS = generateBoxShadow(mage_spell);
const fira_1BS = generateBoxShadow(fira_1);
const fira_2BS = generateBoxShadow(fira_2);
