import React from 'react';

import ReactDOM from 'react-dom';

import Patients from './Patients';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <Patients />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});