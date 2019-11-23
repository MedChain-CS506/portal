# MEDCHAIN

## What is it and what's the benefit

- MedChain is a fully decentralized, Ethereum-based application, which looks to provide medical professionals in developing countries with easy access to their patient's medical files and prescriptions, simply through their aadhaar numbers. While there are many improvements to still be made, this is only one example of what benefits this technology can provide.

## Instructions for launching application

### First, install these tools to run this application

- [MetaMask](https://metamask.io/)
- [Ganache](https://www.trufflesuite.com/ganache)
- Once these are installed, then...
  - Connect custom RPC to `http://127.0.0.1:7545`
  - Import a private key into Metamask

### Next, open the sourcecode in a text editor

- Once inside the root directory, run script `./run_blockchain`
- Additionally, you can verify the tests by running `truffle test` in the root directory

### To run the client

~~~~bash
cd client
npm install
npm start
~~~~

## Folder Breakdown

- Client
  - public
  - src
    - components - Building blocks of the client application
      - layout - reusable components that exist on multiple pages
        - Dialog - A type of modal window, that appears in front of app content to ask for a decision. Used them to create new patient forms or prescriptions.
        - Loading - Displayed when user is not currently signed in through MetaMask
        - Navbar - Headers used for navigation and toggle buttons.
      - pages - components that react router will direct to
        - Landing - The first initial page the user lands on. Can begin by entering a new patient or search for an existing one
        - NotFound - a 404, route-not-found page
        - Profile - The requested profile searched for by the doctor or the pharmacist. Here, they can access a patient's prescription history, while a doctor can also access a patient's basic information as well as any medical files.
    - context - State management tool that passes state to different components
      - patient - The current state of patients, which is drawn out from our Ethereum blockchain
    - utils - Additional utilities used throughout the application
      - theme - allows the toggling between Material UI's light and dark theme
      - getWeb3 - allows for access to web3
      - aadhaar - validates aadhaar entries
- Contracts
- Migrations
- Tests

## Roadmap... Look @ Issues above to find out what is to come/what may not be working at the moment
