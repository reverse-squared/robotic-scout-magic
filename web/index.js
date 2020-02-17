import React from 'react';
import ReactDOM from 'react-dom';

import { PageLoadable } from './components/Loader';

const App = PageLoadable(() => import('./components/App'));

ReactDOM.render(<App />, document.getElementById('root'));

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
};