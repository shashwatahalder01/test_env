// import { test, expect, } from '@playwright/test';
// // import { LoginPage } from '../../pages/loginPage';
// // import { AdminPage } from '../../pages/adminPage';
// // import { CustomerPage } from '../../pages/customerPage';
// // import { VendorPage } from '../../pages/vendorPage';
// import { ApiUtils } from '../../utils/apiUtils';
// import { payloads } from '../../utils/payloads';
// import { data } from '../../utils/testData';
// // import { endPoints } from '../../utils/apiEndPoints';


// test.describe('functionality test', () => {

// 	test('test test', async ({ request }) => {
// 		const apiUtils = new ApiUtils(request);
// 		await apiUtils.updateBatchWcSettingsOptions('general', payloads.general);
// 		const t = await apiUtils.getSystemStatus();
// 		// const b = await apiUtils.get(endPoints.wc.getAllSettingOptions('general'));
// 		// const c = b.map(o => o.id);
// 		console.log(t);

// 	});

// 	test('save admin settings', async () => {

// 		// const query4 = `Select option_value FROM dok_options WHERE option_name = 'dokan_general' ;`;
// 		// const res = await dbUtils.dbQuery(query4);
// 		// await dbUtils.getDokanSettings(dbData.dokan.optionName.general);
// 		// const res = await dbUtils.getDokanSettings(dbData.dokan.optionName.general);
// 		// console.log(res);
// 		// const res = await dbUtils.setDokanSettings(dbData.dokan.optionName.general, dbData.dokan.generalSettings);
// 		// const res = await dbUtils.getCommissionInfo();
// 		// console.log(res);
// 		// expect(res).not.toHaveProperty('errno');
// 	});
// });
