// import * as core from '@actions/core' 
const convert = require('xml-js');
const fs = require('fs');

const env = {
	wpVersion: 'WordPress Version: 6.2.2',
	phpVersion: 'PHP Version: 8',
	mysqlVersion: 'MySql Version: 8.0.27',
	theme: 'Theme: Storefront v4.2.0',
	wpDebugMode: 'Debug Mode: true',
	activePlugins: [
	  'dokan v3.7.20',
	  'dokan-pro v3.7.23',
	  'woocommerce v7.7.2',
	  'woocommerce-bookings v1.15.69',
	  'woocommerce-product-addons v5.0.1',
	  'woocommerce-simple-auctions v2.0.18',
	  'woocommerce-subscriptions v4.6.0'
	]
  }
 const apiTestRes = './junit-report/e2e-results.xml'
 const e2eTestRes = './junit-report/e2e-results.xml'

const getFormattedDuration = ( time) => {
	time =  Number(time) * 1000;
	// const min = Math.floor( time / 1000 / 60 );
	// const sec = Math.floor( ( time / 1000 ) % 60 );
	// return `${ min }m ${ (sec < 10 ? '0' : '') + sec }s`;
	const date = new Date(time);  
	// return `${date.getMinutes()}m${date.getSeconds()}s`;
	return `${date.getMinutes()}.${date.getSeconds()}s`;
};

const getTestResult = (filePath) => {
	const xmlFile = fs.readFileSync(filePath, 'utf8');
	const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
	const testResult = jsonData.testsuites._attributes;
	console.log(testResult);
	const testSummary = ['E2E test', testResult.tests, String( testResult.tests - testResult.failures), testResult.failures, testResult.skipped, getFormattedDuration(testResult.time)];
	return testSummary;
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
	const apiTesResult = getTestResult();
   	const e2eTesResult = getTestResult();
	core.summary
		.addHeading( 'Tests Summary' )
		.addTable( [tableHeader, apiTesResult, e2eTesResult] );
};

const addList = ( core ) => {
	let pluginList = core.summary.addList(env.activePlugins).stringify();
	core.summary.clear();
	let pluginDetails =  core.summary.addDetails('Plugins: ', pluginList).stringify();
	core.summary.clear();
	return core.summary.addList([env.wpVersion, String(env.wpDebugMode), env.phpVersion, env.mysqlVersion, env.theme, pluginList ]).stringify();
}

const addSummaryFooter = ( core ,list) => {
	core.summary
		.addBreak()
		.addDetails('Test Environment Details: ', list);
};

module.exports = async ( { github, context,core } ) => {
	let plugins = addList(core);
	await core.summary.clear();
	addSummaryHeadingAndTable( core );
	addSummaryFooter( core, plugins );
	const summary = core.summary.stringify();
	await core.summary.write();
	return summary;
};
