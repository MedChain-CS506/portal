import React from 'react';

import ReactDOM from 'react-dom';

import PatientTable from './PatientTable';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <PatientTable />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});