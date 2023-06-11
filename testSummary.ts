// import * as core from '@actions/core' 
const convert = require('xml-js');
const fs = require('fs');

// read file
const xmlFile = fs.readFileSync('./junit-report/e2e-results.xml', 'utf8');
const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
const e2eTestRes = jsonData.testsuites._attributes;
// console.log(e2eTestRes);

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


const getFormattedDuration = ( time) => {
	time =  Number(time) * 1000;
	// const min = Math.floor( time / 1000 / 60 );
	// const sec = Math.floor( ( time / 1000 ) % 60 );
	// return `${ min }m ${ (sec < 10 ? '0' : '') + sec }s`;
	const date = new Date(time);  
	// return `${date.getMinutes()}m${date.getSeconds()}s`;
	return `${date.getMinutes()}.${date.getSeconds()}s`;
};

const addSummaryHeadingAndTable = ( core ) => {

	core.summary
	.addHeading( 'Tests Summary' )
	.addTable( [
		[
			{ data: 'Test :test_tube:', header: true },
            { data: 'Total :bar_chart:', header: true },
			{ data: 'Passed :white_check_mark:', header: true },
			{ data: 'Failed :rotating_light:', header: true },
			// { data: 'Flaky :construction:', header: true }, //TODO: add flaky
			{ data: 'Skipped :next_track_button:', header: true },
			{ data: 'Duration :stopwatch:', header: true },
		],
		// ['API test', ],
		['E2E test', e2eTestRes.tests, String( e2eTestRes.tests - e2eTestRes.failures), e2eTestRes.failures, e2eTestRes.skipped, getFormattedDuration(e2eTestRes.time)]
	] );
};

const addPlist = ( core ) => {
	let sum = core.summary.addList([env.wpVersion, String(env.wpDebugMode), env.phpVersion, env.mysqlVersion, env.theme, (env.activePlugins).join(',\n')])
 return sum.stringify();
}

const addDetails = ( core, list ) => {
	  let sum = core.summary.addDetails('Plugins: ', list);
   return sum.stringify();
}
const addList = ( core, list1 ) => {
	  let sum = core.summary.addList([env.wpVersion, String(env.wpDebugMode), env.phpVersion, env.mysqlVersion, env.theme, list1])
   return sum.stringify();
}

const addSummaryFooter = ( core ,list) => {
	core.summary
		.addBreak()
		core.summary.addDetails('Test Environment Details: ', list);
};

module.exports = async ( { github, context,core } ) => {
	core.summary.addList
	let list1 = addPlist(env.activePlugins);
	await core.summary.clear();
	let list2 = addDetails(core, list1);
	await core.summary.clear();
	let list = addList(core, list2);
	await core.summary.clear();

	addSummaryHeadingAndTable( core );
	addSummaryFooter( core,list );
	const summary = core.summary.stringify();
	await core.summary.write();
	return summary;
};
