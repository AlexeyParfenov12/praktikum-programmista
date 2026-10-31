import {useEffect,useState} from 'react';
import {Code2,Menu,X} from 'lucide-react';
import './site-nav.css';
const links=[['/','Обзор'],['/catalog','Практические'],['/glossary','Справочник'],['/downloads','Проекты'],['/help','Помощь']];
export function SiteNav({current}:{current:string}){
 const [open,setOpen]=useState(false);
 useEffect(()=>{setOpen(false)},[current]);
 useEffect(()=>{if(!open)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)};addEventListener('keydown',close);return()=>removeEventListener('keydown',close)},[open]);
 return <header className="site-nav"><div className="site-nav-inner"><a className="site-nav-brand" href="#/" onClick={()=>setOpen(false)}><Code2 size={24}/><span>Практикум<br/>программиста</span></a><button className="site-menu-toggle" type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="site-menu" aria-label={open?'Закрыть меню':'Открыть меню'}>{open?<X size={20}/>:<Menu size={20}/>}<span>Меню</span></button><nav id="site-menu" className={open?'expanded':''} aria-label="Главное меню">{links.map(([path,title])=>{const active=path==='/'?current==='/':path==='/catalog'?/^\/(?:catalog|lesson|work)(?:\/|$)/.test(current):current.startsWith(path);return <a key={path} href={'#'+path} aria-current={active?'page':undefined} onClick={()=>setOpen(false)}>{title}</a>})}</nav></div></header>
}
