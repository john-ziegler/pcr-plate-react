import React from 'react';
import ReactDOM from 'react-dom';
import PCRApp from './Components/PCRApp';
import ExampleData from './Utils/ExampleData';


const rootEl = document.getElementById('root');

ExampleData.init();

ReactDOM.render(<PCRApp />,rootEl);