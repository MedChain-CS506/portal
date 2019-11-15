import React from 'react';

import ReactDOM from 'react-dom';

import Loading from '../Loading';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)
it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <Loading />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it('renders Loading correctly', () => {
   const {getByTestId} = render(<Loading/>)
   expect(getByTestId('loading-box')).toBeTruthy()
});