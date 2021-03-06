import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

import MedChainContract from '../contracts/MedChain.json';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
