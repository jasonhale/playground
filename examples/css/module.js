// checking if the module is loaded

import styles from '/examples/css/toParse.css' with { type: 'css' };

if (styles) {
  window.test = styles;
  // window.testO = o;
  window.origTest = '';

  const obj = styles.cssRules.item(0).styleMap.entries();
  for (const [key, value] of obj) {
    // window.origTest[key] = value[0][0];
    // window.origTest.push(`${key}: ${value[0][0]}`);
    window.origTest += `${key} = ${value[0][0]}
`;
    console.log(`${key} = ${value}`);
  }

  for (const key in styles.cssRules) {
    console.log(`styles.${key} = ${styles[key]}`);
  }
  console.info('CSS module loaded successfully as:', styles);
} else {
  console.error('Failed to load CSS module');
}

function parseStyles(styles) {
  const parsed = {};
  const orig = '';
  for (const rule of styles.cssRules) {
    if (rule.style) {
      for (const prop of rule.style) {
        // parsed[prop] = rule.style.getPropertyValue(prop);

        const proppath = prop.replace(/^--/, '').split('--')[0].split('-');
        proppath.reduce((acc, part, index) => {
          try {
            if (part == '') {
              return acc; // Skip empty parts
            }
            if (!acc[part]) {
              acc[part] = {};
            }
            if (index === proppath.length - 1) {
              acc[part] = rule.style.getPropertyValue(prop);
            }
            return acc[part];
          } catch (error) {
            console.error(`Error processing property "${prop}":`, error);
            return acc; // Return the accumulator in case of error
          }
        }, parsed);

      }
    }
  }
  return parsed;
}

console.log('Parsed styles:', parseStyles(styles));
console.info('CSS module test completed.');

document.querySelector('#output').innerHTML = `
  <pre>${JSON.stringify(parseStyles(styles), null, 2)}</pre>
`;
// document.querySelector('#original').innerHTML = `
//   <pre>${JSON.stringify(window.origTest, null, 2)}</pre>
// `;
document.querySelector('#original').innerHTML = `
  <pre>${window.origTest}</pre>
`;