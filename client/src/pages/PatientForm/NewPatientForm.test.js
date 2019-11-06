import React from 'react';

import ReactDOM from 'react-dom';

import NewPatientForm from './NewPatientForm';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <NewPatientForm />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});