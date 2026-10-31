export async function copyCode(code:string,clipboard?:{writeText:(text:string)=>Promise<void>}):Promise<boolean>{
 try{if(!clipboard)return false;await clipboard.writeText(code);return true}catch{return false}
}
