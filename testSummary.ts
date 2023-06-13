// import * as core from '@actions/core' 
const convert = require('xml-js');
const fs = require('fs');
require('dotenv').config();
const {SHA, PR_NUMBER } = process.env;

// console.log(process.env.HELL);

const readFile = fs.readFileSync('./systemInfo.json', 'utf8'); 

//  const env2 = JSON.stringify(env1);

 const env = JSON.parse(readFile);

 const apiTestResultFile = './junit-report/e2e-results.xml'
 const e2eTestResultFile = './junit-report/e2e-results.xml'

const getFormattedDuration = ( time) => {
	time =  Number(time) * 1000;
	// const min = Math.floor( time / 1000 / 60 );
	// const sec = Math.floor( ( time / 1000 ) % 60 );
	// return `${ min }m ${ (sec < 10 ? '0' : '') + sec }s`;
	const date = new Date(time);  
	// return `${date.getMinutes()}m${date.getSeconds()}s`;
	return `${date.getMinutes()}.${date.getSeconds()}s`;
};

const getTestResult = (suiteName, filePath) => {
	if (fs.existsSync(filePath)) {
	const xmlFile = fs.readFileSync(filePath, 'utf8');
	const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
	const testResult = jsonData.testsuites._attributes;
	const testSummary = [suiteName, testResult.tests, String( testResult.tests - testResult.failures), testResult.failures, testResult.skipped, getFormattedDuration(testResult.time)];
	return testSummary;}
	else {
		return []
	}
}

const addSummaryHeadingAndTable = ( core ) => {
   const tableHeader =   [
	{ data: 'Test :test_tube:', header: true },
	{ data: 'Total :bar_chart:', header: true },
	{ data: 'Passed :white_check_mark:', header: true },
	{ data: 'Failed :rotating_light:', header: true },
	// { data: 'Flaky :construction:', header: true }, //TODO: add flaky
	{ data: 'Skipped :next_track_button:', header: true },
	{ data: 'Duration :alarm_clock:', header: true },
] 
	const apiTesResult = getTestResult('API Tests', apiTestResultFile);
   	const e2eTesResult = getTestResult('E2E Tests', e2eTestResultFile);
	core.summary
		.addHeading( 'Tests Summary' )
		.addRaw( `Commit SHA: ${ SHA }` )
		.addBreak()
		.addBreak()
		.addRaw( `asdf: ${ process.env.HELL }` )
		.addBreak()
		.addBreak()
		.addTable( [tableHeader, apiTesResult, e2eTesResult] );
};

const addList = ( core ) => {
	let pp = env.activePlugins.slice(1, -2);
	let pluginList = core.summary.addList(pp).stringify();
	core.summary.clear();
	let pluginDetails =  core.summary.addDetails('Plugins: ', pluginList).stringify();
	core.summary.clear();
	return core.summary.addList([env.wpVersion, String(env.wpDebugMode), env.phpVersion, env.mysqlVersion, env.theme, pluginDetails ]).stringify();
}

const addSummaryFooter = ( core ,list) => {
	core.summary
		.addBreak()
		.addDetails('Test Environment Details: ', list);
};

module.exports = async ( { github, context, core } ) => {
	let plugins = addList(core);
	await core.summary.clear();
	addSummaryHeadingAndTable( core );
	addSummaryFooter( core, plugins );
	const summary = core.summary.stringify();
	await core.summary.write();
	return summary;
};
