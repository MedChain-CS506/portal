import React, { useState, useEffect } from 'react';

//* Components
import Navbar from './components/layout/Navbar';
import Loading from './components/layout/Loading';

//* Styles
import './index.css'

//* Pages
import Routes from './components/pages/Routes';
import Landing from './components/pages/Landing';
import PatientForm from './components/pages/PatientForm';
import Profile from './components/pages/Profile';
import NotFound from './components/pages/NotFound';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//* Context
import PatientState from './context/patient/PatientState'

//* Blockchain
// import getWeb3 from './utils/getWeb3.js';
// import MedChainContract from './contracts/med_chain.json';

//* App
function App() {

  const [signedIn, setSignedIn] = useState(true);
  const [ready, setReady] = useState(true);

  const [contract, setContract] = useState({
    web3: null,
    accounts: null,
    contract: null
  });

  // useEffect(() => {
  //   async function connectMetamask() {
  //     try {
  //       const web3 = await getWeb3();
  //       const accounts = await web3.eth.getAccounts();
  //       const networkId = await web3.eth.net.getId();
  //       const deployedNetwork = MedChainContract.networks[networkId];
  //       const instance = new web3.eth.Contract(
  //         MedChainContract.abi,
  //         deployedNetwork && deployedNetwork.address
  //       );
  //       let data = {
  //         accounts: accounts,
  //         web3: web3,
  //         contract: instance
  //       };
  //       setContract(data);
  //       setSignedIn(true);
  //       setReady(true);
  //       return data;
  //     } catch (error) {
  //       setSignedIn(false);
  //       setReady(false);
  //       console.error(error);
  //     }
  //   }

  //   connectMetamask().then((data) => {
  //     setInterval(async () => {
  //       const rn = await data.web3.eth.getAccounts();
  //       if (rn[0] !== data.accounts[0]) {
  //         setSignedIn(false);
  //       } else if (rn[0] === data.accounts[0]) {
  //         setSignedIn(true);
  //       }
  //     }, 100)
  //   });

  // }, [signedIn]);

  return (
    <PatientState>
      {!ready && <Loading />}
      {ready && (
        <Router>
          <>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path="/" render={(props) => <Landing {...props} signedIn={signedIn} contract={null} />} />
                <Route exact path="/patient-form" render={(props) => <PatientForm {...props} signedIn={signedIn} />} />
                <Route exact path="/profile/:id" render={(props) => <Profile {...props} signedIn={signedIn} />} />
                <Route component={NotFound} />
                <Redirect to="/not-found" />
              </Switch>
            </div>
          </>
        </Router>
      )}
    </PatientState>
  );
}

export default App;
