import fs from 'node:fs';
// Reserve the original space for lazy-loaded screenshots.
export function jpegSize(bytes){
 if(bytes.readUInt16BE(0)!==0xffd8)throw Error('Expected JPEG');
 let at=2;
 while(at<bytes.length){
  if(bytes[at++]!==0xff)throw Error('Invalid JPEG segment');
  while(bytes[at]===0xff)at++;
  const marker=bytes[at++];
  if(marker===0xd8||marker===0x01||(marker>=0xd0&&marker<=0xd7))continue;
  if(marker===0xd9||marker===0xda)break;
  const size=bytes.readUInt16BE(at);
  if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return {width:bytes.readUInt16BE(at+5),height:bytes.readUInt16BE(at+3)};
  at+=size;
 }
 throw Error('No JPEG dimensions found');
}
const sizes=Object.fromEntries(fs.readdirSync('public/vs-real').filter(f=>f.endsWith('.jpg')).sort().map(file=>[file,jpegSize(fs.readFileSync('public/vs-real/'+file))]));
fs.writeFileSync('src/screenshot-sizes.json',JSON.stringify(sizes,null,2)+'\n');
console.log(`Recorded original dimensions for ${Object.keys(sizes).length} screenshots.`);
