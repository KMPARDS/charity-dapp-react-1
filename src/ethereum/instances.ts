import { ethers } from 'ethers';
import { CharityDappFactory } from './CharityDappFactory';

window.provider = new ethers.providers.JsonRpcProvider('https://mainnet.eraswap.network');
window.charityInstance = CharityDappFactory.connect(
  '0x01Ec93d789844135B0863Ac6F19e7E98AB237CE3',
  window.provider
);
// Temporary wallet
// if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
//   window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY, window.provider);
// }

// https://ipfs.eraswap.cloud/ipfs/QmaT1sXGV9Fbjcv3GzcrhsCRY6DYMwoYkVjZuoqJ9ftL8X/
