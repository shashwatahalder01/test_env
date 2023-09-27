const fs = require('fs');

// Read the JSON file and parse the JSON data
const data = JSON.parse(fs.readFileSync('Report/json/results.json', 'utf8'));

const counts = {
    passed: 0,
    failed: 0,
    flaky: 0,
    skipped: 0,
};

// Iterate through suites, specs, and tests
data.suites.forEach(suite => {
    suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
            const { status, results } = test;
            if (status === 'expected') counts.passed++;
            else if (status === 'unexpected' && results.some(result => result.status === 'failed'))
                counts.failed++;
            else if (status === 'flaky')
                counts.flaky++;
            else if (status === 'skipped')
                counts.skipped++;
        });
    });
});


// Output the counts
console.log('Passed:', counts.passed);
console.log('Failed:', counts.failed);
console.log('Flaky:', counts.flaky);
console.log('Skipped:', counts.skipped);





// // Initialize counters using reduce
// const counts = data.suites.flatMap(suite =>
//     suite.specs.flatMap(spec =>
//         spec.tests.reduce((acc, test) => {
//             const status = test.status;
//             if (status === 'expected') {
//                 acc.passed++;
//             } else if (status === 'unexpected' && test.results.some(result => result.status === 'failed')) {
//                 acc.failed++;
//             } else if (status === 'flaky') {
//                 acc.flaky++;
//             }
//             else if (status === 'skipped') {
//                 acc.skipped++;
//             }
//             return acc;
//         }, { passed: 0, failed: 0, flaky: 0, skipped: 0 })
//     )
// ).reduce((acc, item) => {
//     acc.passed += item.passed;
//     acc.failed += item.failed;
//     acc.flaky += item.flaky;
//     acc.skipped += item.skipped;
//     return acc;
// }, { passed: 0, failed: 0, flaky: 0, skipped: 0 });