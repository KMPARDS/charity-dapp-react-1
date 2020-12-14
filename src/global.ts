import { ethers } from 'ethers';
import { CustomProvider } from 'eraswap-sdk';
import { CharityDapp } from './ethereum/CharityDapp';

// mark the typings of your global variables
declare global {
  interface Window {
    provider: ethers.providers.JsonRpcProvider;
    providerESN: CustomProvider;
    wallet: any;
    ethereum: ethers.providers.ExternalProvider;
    charityInstance: CharityDapp;
    // wallet: CustomWallet | ethers.providers.JsonRpcSigner | undefined; // marking this as undefined helps to prevent many runtime bugs when wallet is not loaded
  }
}
