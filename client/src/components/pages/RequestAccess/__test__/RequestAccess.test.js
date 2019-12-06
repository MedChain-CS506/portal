import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import RequestAccess from '../RequestAccess';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <RequestAccess />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly with add doctor button', () => {
  const { getByTestId } = render(
    <Router>
      <RequestAccess />
    </Router>
  );

  expect(getByTestId('error-message')).toHaveTextContent('Request Access');

  expect(getByTestId('error-desc')).toHaveTextContent(
    'Sign up to access a new means of patient record keeping'
  );

  expect(getByTestId('new-doc-button')).toBeTruthy();
  expect(getByTestId('new-phar-button')).toBeTruthy();
});
