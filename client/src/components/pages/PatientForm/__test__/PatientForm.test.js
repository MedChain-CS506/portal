import React from 'react';

import ReactDOM from 'react-dom';

import PatientForm from '../PatientForm';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <PatientForm signedIn={true}/>
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});