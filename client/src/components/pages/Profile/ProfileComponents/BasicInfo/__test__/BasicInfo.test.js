import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BasicInfo from '../BasicInfo';
// import MedChainContract from '../../../../../../contracts/MedChain.json';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <BasicInfo
        contract={'../../../../../../contracts/MedChain.json'}
        aadhaar={123412341234}
      />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it('basic infor renders correctly', () => {
  const { BasicInfoCall } = render(
    <Router>
      <BasicInfo
        contract={'../../../../../../contracts/MedChain.json'}
        aadhaar={123412341234}
      />
    </Router>
  );
  // expect(getByTestId("search-bar")).toHaveTextContent(
  //   process.env.REACT_APP_NAME
  // );
  // expect(BasicInfoCall("search-bar")).toBeTruthy();
  expect(BasicInfoCall).toMatchSnapshot(); //! this is not doing anything here, you should use somewhere else
});
