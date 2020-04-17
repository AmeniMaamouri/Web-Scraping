import React from 'react';
import ReactDOM from 'react-dom';


import './assets/styles/base.scss';
import 'sweetalert/dist/sweetalert.css';

import App from './app';



import configureStore from './config/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


