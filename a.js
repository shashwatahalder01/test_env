const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('Report/json/results.json', 'utf8');

// Parse the JSON data
const data = JSON.parse(jsonData);

// Initialize counters
let passedCount = 0;
let failedCount = 0;
let flakyCount = 0;
let skippedCount = 0;

// Iterate through suites and specs
for (const suite of data.suites) {
  for (const spec of suite.specs) {
    for (const test of spec.tests) {
      // Check the status of the test
      if (test.status === 'expected') {
        passedCount++;
      } else if (test.status === 'unexpected' && test.results.some(result => result.status === 'failed')) {
        failedCount++;
      } else if (test.status === 'flaky') {
        flakyCount++;
      } else if (test.status === 'skipped') {
        skippedCount++;
      }
    }
  }
}

// Output the counts
console.log('Passed:', passedCount);
console.log('Failed:', failedCount);
console.log('Flaky:', flakyCount);
console.log('Skipped:', skippedCount);


