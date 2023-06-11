var ms = 1.8833369999974967 ,
min = Math.floor((ms/1000/60) << 0),
sec = Math.floor((ms/1000) % 60);
console.log(min + ':' +  (sec < 10 ? '0' : '') + sec);
console.log((min < 1 ? '' : min + 'm') + (sec < 10 ? '0' + sec : '') + 's'  );

const date = new Date(1.8833369999974967 * 1000 );  
console.log(`${date.getMinutes()}m${date.getSeconds()}s`);
console.log(`${date.getMinutes()}.${date.getSeconds()}s.${date.getMilliseconds()}ms`);
