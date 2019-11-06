import React from 'react';

import ReactDOM from 'react-dom';

import PatientProfile from './PatientProfile';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <PatientProfile />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});