import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { loadState, saveState } from './utils';
import { RootStore } from "./stores";
import { autorun } from "mobx";
import { Provider } from 'mobx-react';
import 'rc-notification/assets/index.css';

// Store init
const initState = loadState();
const mobXStore = new RootStore(initState);
autorun(() => {
    console.dir(mobXStore);
    saveState(mobXStore.serialize());
}, {delay: 1000});

ReactDOM.render(  <Provider {...mobXStore}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
