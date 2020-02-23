import React from 'react';
import DOM from 'react-dom';

import App from './App';

import './styles/global.css';
import styles from './app.css';

const app = document.getElementById('app');

app.className = styles.app;

DOM.render(<App />, app);
