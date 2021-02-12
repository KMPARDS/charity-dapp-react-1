import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import WalletConnectProvider from '@walletconnect/web3-provider';
import copy from 'copy-to-clipboard';
import WalletContext from '../WalletContext';
import { Link } from 'react-router-dom';

export function NavbarMain() {
  const globalState = useContext(WalletContext);
  const [Address, setAddress] = useState(null);

  async function loadWallet() {
    try {
      //  Create WalletConnect Provider
      const walletConnectProvider = new WalletConnectProvider({
        rpc: { 5197: 'https://rpc-mumbai.mainnet.eraswap.network' },
        // infuraId: "b81341e3ab894360a84f3fa640ab985e" , 
        qrcode: true,
      });
      await walletConnectProvider.enable();
      const provider = new ethers.providers.Web3Provider(walletConnectProvider);
      console.log(provider.getSigner());
      const wallet = await provider.getSigner();
      const address = await wallet.getAddress();
      setAddress(address);
      globalState.setState({ address });
      window.wallet = wallet;
    } catch (e) {
      Swal.fire('Opps !', 'Something went wrong. Please try again', 'error');
    }
  }

  const loadMetamask = async () => {
    try {
      if (window.ethereum) {
        //@ts-ignore
        window.ethereum.enable();
        const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await metamaskProvider.getNetwork();
        if (network.name === 'homestead') {
          network.name = 'Main Ethereum Network';
          alert('please connect with https://test.eraswap.network');
        } else if (network.chainId === 5196) {
          network.name = 'Test EraSwap Network';
        } else if (network.chainId === 5197) {
          network.name = 'Main Era Swap Network';
        }
        console.log(ethers.Wallet);
        const onCorrectNetwork = network.chainId === 5197;
        if (!onCorrectNetwork) {
          alert('please connect to eraswap network ');
        } else {
          const wallet = await metamaskProvider.getSigner();
          console.log('Wallet : ', wallet);
          const address = await wallet.getAddress();
          setAddress(address);
          globalState.setState({ address });

          console.log('Address :', address);
          window.wallet = wallet;
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Opps !', 'Something went wrong. Please try again', 'error');
    }
  };
  function Wallet() {
    return (
      <div style={{ width: '400px', marginTop: '10px', padding: '15px' }}>
        <p>Use Account From </p>
        <div className="dropdown-divider "></div>
        <div className="row">
          <div className="col-4 text-center  wallet " onClick={loadMetamask}>
            <img
              className="my-1"
              src="https://docs.metamask.io/metamask-fox.svg"
              width="70px"
              alt="metamsak"
            />
            <h6>MetaMask</h6>
          </div>
          <div className="col-4 text-center   wallet " onClick={loadWallet}>
            <img
              src="https://avatars0.githubusercontent.com/u/37784886"
              width="70px"
              alt="walletconnect"
            />
            <h6>WalletConnect</h6>
          </div>
          <div
            className="col-4 text-center wallet "
            onClick={() => window.open('https://eraswap.life/', '', 'width=1001,height=650')}
          >
            <img
              className="my-3"
              src={process.env.PUBLIC_URL + 'assets/img/eralogo.png'}
              width="70px"
              alt="eraswap"
            />
            <h6>EraSwap.life</h6>
          </div>
        </div>
        <div className="dropdown-divider "></div>
        <a
          href="https://eraswap.life/create-new-wallet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center"
        >
          Don’t have an Ethereum account?
        </a>
      </div>
    );
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Copied !
    </Tooltip>
  );
  function Account() {
    return (
      <div style={{ width: '400px', marginTop: '10px', padding: '15px' }}>
        <p>ACTIVE ACCOUNT</p>
        <div className="dropdown-divider "></div>
        <OverlayTrigger placement="left" overlay={renderTooltip}>
          <i
            className="fa fa-clone"
            style={{ marginLeft: 8, float: 'right', fontSize: '1.5em' }}
            onClick={() => {
              copy(Address);
            }}
          ></i>
        </OverlayTrigger>
        <p>
          <i className="fa fa-dot-circle-o text-success"></i> You are Connected with :{' '}
          {globalState.state?.address}
        </p>
        <Link to='/Profile'
          className="btn btn-outline-primary btn-block"
          
        >
          See Profile
        </Link>
        <div className="dropdown-divider "></div>
        <button
          type="button"
          className="btn btn-outline-danger btn-block"
          onClick={() => {
            window.wallet = undefined;
            setAddress(null);
            globalState.setState({ address: '' });
            window.localStorage.clear();
          }}
        >
          DisConnect
        </button>
      </div>
    );
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function CustomWallets(e: MessageEvent<any>) {
    setTimeout(() => {
      const message = e.data;
      if (message.substring) {
        if (message.substring(0, 2) === '0x') {
          window.wallet = new ethers.Wallet(message).connect(window.provider);
          setAddress(window.wallet.address);
          globalState.setState({ address: window.wallet.address });
        }
      }
    }, 0);
  }
  // ( async () =>
  // { if(window.wallet){
  //    if( (window.wallet.address))setAddress( (window.wallet.address));
  //    else setAddress( (await window.wallet.getAddress()));
  //  }})();

  useEffect(() => {
    document.addEventListener('scroll', () => {});
    window.addEventListener('message', (e) => {
      CustomWallets(e);
    });
    return () => {
      window.removeEventListener('message', (e) => {
        CustomWallets(e);
      });
    };
  }, [Address, CustomWallets]);

  return (
    <header id="header" className="header-inner-pages">
      <div className="container-fluid d-flex align-items-center justify-content-between pdt10">
        <h1 className="logo">
          <a href="/">
            <img src="/assets/img/logo.png" alt="logo" />
          </a>
        </h1>
        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className="active">
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#aboutus">About</a>
            </li>
            <li>
              <a href="/#why">Why</a>
            </li>
          </ul>
        </nav>
        {/* <a href="https://eraswap.life/" target="_blank" rel="noopener noreferrer"  className="get-started-btn scrollto btn">Connect To Wallet</a> */}
        <Dropdown className="nav mr10" alignRight>
          <Dropdown.Toggle className="get-started-btn scrollto btn" id="dropdown-basic">
            {!Address ? (
              'Connect to Wallet'
            ) : (
              <>
                <i className="fa fa-circle text-success"></i>&nbsp;{Address}
              </>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>{!Address ? <Wallet /> : <Account />}</Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
