import {useState} from 'react';
import {copyCode} from './copy-code';
export function ReadingCode({code,language='csharp'}:{code:string;language?:'csharp'|'sql'|'bash'|'text'}){
 const [status,setStatus]=useState<'idle'|'copied'|'error'>('idle');
 const label={csharp:'C#',sql:'SQL',bash:'Терминал',text:'Пример'}[language];
 async function copy(){setStatus(await copyCode(code,typeof navigator==='undefined'?undefined:navigator.clipboard)?'copied':'error')}
 const tokens=language==='csharp'?code.split(/("(?:\\.|[^"\\])*"|\/\/[^\n]*|\b(?:private|public|internal|void|int|decimal|string|bool|double|var|class|new|return|if|else|foreach|for|using|namespace|true|false|null|out|is|not|static|set|get)\b|\b\d+(?:\.\d+)?m?\b)/g):[code];
 return <div className="reading-code"><div className="reading-code-bar"><span>{label}</span><button type="button" onClick={copy}>{status==='copied'?'Скопировано':'Копировать'}</button></div><pre tabIndex={0} aria-label={'Код: '+label}><code>{tokens.map((s,i)=><span key={i} className={language!=='csharp'?undefined:s.startsWith('//')?'comment':s.startsWith('"')?'str':/^(?:private|public|internal|void|int|decimal|string|bool|double|var|class|new|return|if|else|foreach|for|using|namespace|true|false|null|out|is|not|static|set|get)$/.test(s)?'kw':/^\d/.test(s)?'num':undefined}>{s}</span>)}</code></pre><p className={'copy-status'+(status==='error'?' copy-error':'')} role="status">{status==='error'?'Не удалось скопировать. Выделите код и скопируйте вручную.':status==='copied'?'Код скопирован в буфер обмена.':''}</p></div>
}
