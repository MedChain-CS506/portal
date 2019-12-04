import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from '../Profile';

import MedChainContract from '../../../../contracts/MedChain.json';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Profile contract={MedChainContract} />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
