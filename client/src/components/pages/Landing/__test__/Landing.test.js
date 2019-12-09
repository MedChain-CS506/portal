import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import Landing from '../Landing';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Landing />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly with signedIn being false', () => {
  const { getByTestId } = render(
    <Router>
      <Landing />
    </Router>
  );
  expect(getByTestId('basic-desc')).toHaveTextContent(
    'The simplest decentralized medical-records application'
  );
});

it('renders correctly with signedIn being true, as a doctor', () => {
  const { getByTestId } = render(
    <Router>
      <Landing isDoctor isPharmacist={false} />
    </Router>
  );
  // expect(getByTestId("search-bar")).toHaveTextContent(
  //   process.env.REACT_APP_NAME
  // );
  expect(getByTestId('add-patient-button')).toBeTruthy();
  expect(getByTestId('search-bar')).toBeTruthy();
  expect(getByTestId('search-patient-form')).toBeTruthy();
});

it('renders correctly with signedIn being true, as a pharmacist', () => {
  const { getByTestId } = render(
    <Router>
      <Landing isPharmacist />
    </Router>
  );
  // expect(getByTestId("search-bar")).toHaveTextContent(
  //   process.env.REACT_APP_NAME
  // );
  expect(getByTestId('search-bar')).toBeTruthy();
  expect(getByTestId('search-patient-form')).toBeTruthy();
  expect(getByTestId).toMatchSnapshot(); //! this is not doing anything here, you should use somewhere else
});

// it("render correctly text component", () => {
// 	const TextInputComponent = Renderer.create(<Landing />).toJSON();
// 	expect(TextInputComponent).toMatchSnapshot();
// });
