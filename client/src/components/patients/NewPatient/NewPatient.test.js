import React from 'react';

import ReactDOM from 'react-dom';

import NewPatient from './NewPatient';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <NewPatient />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});