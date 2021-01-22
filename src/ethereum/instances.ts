import { ethers } from 'ethers';
import { CharityDappFactory } from './CharityDappFactory';

import { CustomProvider } from "eraswap-sdk/dist";

// window.provider = new ethers.providers.JsonRpcProvider('https://mainnet.eraswap.network');

window.provider = new CustomProvider("mainnet");
window.providerESN = new CustomProvider("mainnet");

window.charityInstance = CharityDappFactory.connect(
  '0xeB90CEc1EC2c37Ec350ca4B7bAfD5b19D1E9c296',
  window.provider
);
// Temporary wallet
// if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
//   window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY, window.provider);
// }

// https://ipfs.eraswap.cloud/ipfs/QmaT1sXGV9Fbjcv3GzcrhsCRY6DYMwoYkVjZuoqJ9ftL8X/
