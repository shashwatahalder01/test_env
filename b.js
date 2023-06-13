// // var ms = 1.8833369999974967 ,
// // min = Math.floor((ms/1000/60) << 0),
// // sec = Math.floor((ms/1000) % 60);
// // console.log(min + ':' +  (sec < 10 ? '0' : '') + sec);
// // console.log((min < 1 ? '' : min + 'm') + (sec < 10 ? '0' + sec : '') + 's'  );

// // const date = new Date(1.8833369999974967 * 1000 );  
// // console.log(`${date.getMinutes()}m${date.getSeconds()}s`);
// // console.log(`${date.getMinutes()}.${date.getSeconds()}s.${date.getMilliseconds()}ms`);


// const env1 = {
// 	wpVersion: 'WordPress Version: 6.2.2',
// 	phpVersion: 'PHP Version: 8',
// 	mysqlVersion: 'MySql Version: 8.0.27',
// 	theme: 'Theme: Storefront v4.2.0',
// 	wpDebugMode: 'Debug Mode: true',
// 	activePlugins: [
// 	  'dokan v3.7.20',
// 	  'dokan-pro v3.7.23',
// 	  'woocommerce v7.7.2',
// 	  'woocommerce-bookings v1.15.69',
// 	  'woocommerce-product-addons v5.0.1',
// 	  'woocommerce-simple-auctions v2.0.18',
// 	  'woocommerce-subscriptions v4.6.0'
// 	]
//   }
  
//  const env2 = JSON.stringify(env1);
//  const env = JSON.parse(env2);

//  console.log(env2);
//  console.log(env);



const fs = require('fs');



function createEnvVariable(key,value) {

const content = key + '=' +value + "\n";

	fs.appendFile('.abb', content, (err) => {
		if (err) throw err;
		console.log('Saved!');
	  });

	  try {
		fs.appendFile('.abb', content)
		// file written successfully
	  } catch (err) {
		console.error(err);
	  }
}


createEnvVariable('QWERTY','qwerty')