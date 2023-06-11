const convert = require('xml-js');
const fs = require('fs');
const { log } = require('console');

// read file
const xmlFile = fs.readFileSync('./playwright-report/e2e/junit-report/e2e-results.xml', 'utf8');

// parse xml file as a json object
const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
console.log("to json ->", jsonData);
const e2eTestRes = jsonData.testsuites._attributes;

const getFormattedDuration = ( time ) => {
    time =  Number(time) * 1000;
	// const min = Math.floor( time / 1000 / 60 );
	// const sec = Math.floor( ( time / 1000 ) % 60 );
	// return `${ min }m ${ (sec < 10 ? '0' : '') + sec }s`;
	const date = new Date(time);  
	// return `${date.getMinutes()}m${date.getSeconds()}s`;
	return `${date.getMinutes()}.${date.getSeconds()}s`;
};

console.log(['E2E test', e2eTestRes.tests, String( e2eTestRes.tests - e2eTestRes.failures), e2eTestRes.failures, e2eTestRes.skipped, getFormattedDuration(e2eTestRes.time)]);
