import React, { useState, useEffect } from 'react';

//* Utils
import theme from './utils/theme';

//* Components
import Navbar from './components/layout/Navbar';
import Loading from './components/layout/Loading';

//* Pages
import Routes from './components/pages/Routes';

//* Context
import PatientState from './context/patient/PatientState'

//* Blockchain
import getWeb3 from './utils/getWeb3.js';
import MedChainContract from './contracts/med_chain.json';


//* App
function App() {

  const [signedIn, setSignedIn] = useState(true);
  const [ready, setReady] = useState(true);

  const [contract, setContract] = useState({
    web3: null,
    accounts: null,
    contract: null
  });

  useEffect(() => {
    async function connectMetamask() {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MedChainContract.networks[networkId];
        const instance = new web3.eth.Contract(
          MedChainContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        let data = {
          accounts: accounts,
          web3: web3,
          contract: instance
        };
        setContract(data);
        setSignedIn(true);
        setReady(true);
      } catch (error) {
        setSignedIn(false);
        setReady(false);
        console.error(error);
      }
    }
    connectMetamask();
  }, []);

  return (
    <PatientState>
      {!ready && <Loading />}
      {ready && (
        <>
          <Navbar />
          <Routes signedIn={signedIn} contract={contract} />
        </>
      )}
    </PatientState>
  );
}

export default App;
