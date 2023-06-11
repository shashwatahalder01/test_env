

const addSummaryHeadingAndTable = ( core ) => {

	core.summary.addHeading( 'Smoke tests on nightly build' ).addTable( [
		[
			{ data: 'Test :test_tube:', header: true },
            { data: 'Total :bar_chart:', header: true },
			{ data: 'Passed :white_check_mark:', header: true },
			{ data: 'Failed :rotating_light:', header: true },
			{ data: 'Broken :construction:', header: true },
			{ data: 'Skipped :next_track_button:', header: true },
			{ data: 'Unknown :grey_question:', header: true },
			{ data: 'Duration :stopwatch:', header: true },
		],
		['API test', '238', '236', '1', '0', '1', '-', '10 min'],
		['E2E test', '115', '110', '1', '0', '4', '-', '15 min']

	] );
};




const addSummaryFooter = ( core ) => {
	core.summary
		.addSeparator()
		.addRaw( 'Test Message 1' )
		.addLink(
			'here.',
			'https://playwright.dev'
		)
		.addBreak()
		.addRaw( 'Test Message 2' )

};




module.exports = async ( { core } ) => {
	addSummaryHeadingAndTable( core );
	addSummaryFooter( core );
	const summary = core.summary.stringify();
	await core.summary.write();
	return summary;
};
