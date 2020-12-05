import { createContext } from 'react';

const initialMapContext: { state: any; setState: React.Dispatch<React.SetStateAction<any>> } = {
  state: {},
  setState: () => {},
};

const WalletContext = createContext(initialMapContext);

export default WalletContext;
