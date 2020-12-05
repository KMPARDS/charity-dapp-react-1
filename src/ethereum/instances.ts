import { ethers } from 'ethers';
// import { CustomProvider,  addresses } from 'eraswap-sdk';
import { CharityDappCharityDappFactory } from './CharityDappCharityDappFactory';
// import { CustomProvider } from './custom-providers';

// import {
// } from 'eraswap-sdk/dist/typechain/ESN';

// const config = addresses[process.env.REACT_APP_ENV === 'production' ? 'production' : 'development'];
//@ts-ignore
// window.providerESN = new CustomProvider('mainnet');
window.provider = new ethers.providers.JsonRpcProvider('https://mainnet.eraswap.network');
window.charityInstance = CharityDappCharityDappFactory.connect(
  '0xccc6D594b78603A3A2362A162989E2884b6595a8',
  window.provider
);
// Temporary wallet
// if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
//   window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY, window.provider);
// }

// https://ipfs.eraswap.cloud/ipfs/QmaT1sXGV9Fbjcv3GzcrhsCRY6DYMwoYkVjZuoqJ9ftL8X/
