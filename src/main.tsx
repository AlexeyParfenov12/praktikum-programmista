import React from 'react';
import {createRoot} from 'react-dom/client';
import {Portal} from './Portal';
import './reader.css';
import './style.css';
import './site-nav.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><Portal/></React.StrictMode>);
