export type HandbookEntry={
 id:string;
 title:string;
 category:string;
 kind:string;
 description:string;
 syntax:string;
 example:string;
 notes:string;
 aliases?:string[];
 docsUrl:string;
 lectureTokens?:string[];
 language?:'csharp'|'sql'|'bash'|'text';
};
export type IndexedHandbookEntry=HandbookEntry&{lectureIds:number[]};
