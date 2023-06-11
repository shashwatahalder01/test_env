import convert from 'xml-js';
import fs from 'fs';

// read file
const xmlFile = fs.readFileSync('./playwright-report/junit-report/e2e-results.xml', 'utf8');
const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
const e2eTestRes = jsonData.testsuites._attributes;

const getFormattedDuration = ( time: string | number  ) => {
	time =  Number(time) * 1000;
	// const min = Math.floor( time / 1000 / 60 );
	// const sec = Math.floor( ( time / 1000 ) % 60 );
	// return `${ min }m ${ (sec < 10 ? '0' : '') + sec }s`;
	const date = new Date(time);  
	// return `${date.getMinutes()}m${date.getSeconds()}s`;
	return `${date.getMinutes()}.${date.getSeconds()}s`;
};

const addSummaryHeadingAndTable = ( core ) => {

	core.summary.addHeading( 'Tests Summary' ).addTable( [
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

const addSummaryFooter = ( core ) => {
	core.summary
		// .addSeparator()
		.addRaw( 'Test Message 1' )
		.addLink(
			'here.',
			'https://playwright.dev'
		)
		.addBreak()
		.addRaw( 'Test Message 2' )

};

module.exports = async ( { github, context, core} ) => {
	addSummaryHeadingAndTable( core );
	addSummaryFooter( core );
	const summary = core.summary.stringify();
	await core.summary.write();
	return summary;
};
