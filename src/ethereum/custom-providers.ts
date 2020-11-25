import { ethers, providers, version, BigNumber } from 'ethers';
import { Deferrable } from '@ethersproject/properties';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { Logger } from '@ethersproject/logger';

import {  addresses,utils } from 'eraswap-sdk';
// import {  parseEthersJsError } from 'eraswap-sdk/utils';

import {
  isHexString,
  parseBytes32String,
  formatBytes32String,
  hexStripZeros,
  hexZeroPad,
} from 'ethers/lib/utils';

const {parseEthersJsError} = utils;

const logger = new Logger(version);

/**
 * Overriding funtion to be used in CustomFallbackProvider and CustomJsonRpcProvider
 *
 * @param _this: Pass self here
 * @param name: username
 */
async function resolveAddress(
  _this: providers.BaseProvider,
  name: string | Promise<string>
): Promise<string | never> {
  name = await name;

  if (name === '') {
    logger.throwError(`Empty usernames not allowed`);
  }

  // If it is already an address, nothing to resolve
  try {
    return Promise.resolve(_this.formatter.address(name));
  } catch (error) {
    // If is is a hexstring, the address is bad (See #694)
    if (isHexString(name)) {
      throw error;
    }
  }

  if (typeof name !== 'string') {
    logger.throwArgumentError('invalid ENS name', 'name', name);
  }

  if (!_this.network.ensAddress) {
    logger.throwError('ens address is not configured');
  }

  // resolveAddress(bytes32)
  const transaction = {
    to: _this.network.ensAddress,
    data: '0x6a14920a' + formatBytes32String(name).substring(2),
  };

  let addr = await _this.call(transaction);
  if (addr.length > 42) {
    addr = hexZeroPad(hexStripZeros(addr), 20);
  }

  if (addr === ethers.constants.AddressZero) {
    logger.throwError(
      `The kycname ${name} does not resolve to a non-zero address`
    );
  }

  return _this.formatter.address(addr);
}

/**
 * Overriding funtion to be used in CustomFallbackProvider and CustomJsonRpcProvider
 *
 * @param _this
 * @param address
 */
async function resolveUsername(
  _this: providers.BaseProvider,
  address: string | Promise<string>
): Promise<string | never> {
  address = await address;
  address = _this.formatter.address(address);

  // resolveUsername(address)
  const name = parseBytes32String(
    await _this.call({
      to: _this.network.ensAddress,
      data: '0x1f70693c' + hexZeroPad(address, 32).substring(2),
    })
  );

  if (name === '') {
    logger.throwError(
      `The address ${address} does not resolve to a non-empty username`
    );
  }

  // Make sure the reverse record matches the foward record
  const addr = await _this.resolveName(name);
  if (addr != address) {
    logger.throwError(
      `The address ${address} mismatches with the resolved address of ${name} as ${addr}`
    );
  }

  return name;
}

/**
 * Custom Fall Back Provider, has overrided ENS methods with kyc dapp methods
 */
export class CustomFallbackProvider extends providers.FallbackProvider {
  async resolveName(name: string | Promise<string>): Promise<string> {
    return await this.resolveAddress(name);
  }

  async lookupAddress(address: string | Promise<string>): Promise<string> {
    return await this.resolveUsername(address);
  }

  async resolveAddress(
    name: string | Promise<string>
  ): Promise<string | never> {
    return resolveAddress(this, name);
  }

  async resolveUsername(
    address: string | Promise<string>
  ): Promise<string | never> {
    return await resolveUsername(this, address);
  }
}

/**
 * Custom Json Rpc Provider, has overrided ENS methods with kyc dapp methods
 * and call, estimateGas methods to trace revert reasons.
 */
export class CustomJsonRpcProvider extends providers.StaticJsonRpcProvider {
  async resolveName(name: string | Promise<string>): Promise<string> {
    return await this.resolveAddress(name);
  }

  async lookupAddress(address: string | Promise<string>): Promise<string> {
    return await this.resolveUsername(address);
  }

  async resolveAddress(
    name: string | Promise<string>
  ): Promise<string | never> {
    return resolveAddress(this, name);
  }

  async resolveUsername(
    address: string | Promise<string>
  ): Promise<string | never> {
    return await resolveUsername(this, address);
  }

  async call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: string | number | undefined
    // @ts-ignore Because including undefined makes the override  signature mismatch
  ): Promise<string> {
    try {
      const resp = await super.call(transaction, blockTag);
      // console.log(resp);

      return resp;
    } catch (error) {
      const data = error?.error?.data;
      // console.log('resp', data);

      if (typeof data === 'string' && data.slice(0, 9) === 'Reverted ') {
        const actualData = data.slice(9);
        const iface = new ethers.utils.Interface(['function Error(string)']);

        logger.throwError(
          actualData !== '0x'
            ? iface.decodeFunctionData('Error', actualData)[0]
            : 'Call was reverted without a revert reason',
          Logger.errors.CALL_EXCEPTION
        );
      } else {
        throw error;
      }
    }
  }

  async estimateGas(
    transaction: Deferrable<TransactionRequest>
  ): Promise<BigNumber> {
    try {
      const resp = await super.estimateGas(transaction);
      // console.log(resp);

      return resp;
    } catch (error) {
      let { from, to, data, value } = transaction;

      // @ts-ignore
      if (typeof value === 'object' && value._isBigNumber) {
        // @ts-ignore
        value = value.toHexString();
      }

      const provider = this;

      if (provider.send) {
        let result: any;
        try {
          result = await provider.send('trace_call', [
            { from, to: await to, data, value },
            ['vmtrace', 'trace'],
          ]);
        } catch (error) {
          console.log('trace_call error:', parseEthersJsError(error));
        }

        if (result?.output) {
          // console.log(result);

          const i = new ethers.utils.Interface(['function Error(string)']);
          return logger.throwError(
            result?.output !== '0x'
              ? i.decodeFunctionData('Error', result.output)[0]
              : 'Call was reverted without a revert reason',
            Logger.errors.CALL_EXCEPTION
          );
        }
      }

      return logger.throwError(
        'cannot estimate gas; transaction may fail or may require manual gas limit',
        Logger.errors.UNPREDICTABLE_GAS_LIMIT,
        {
          error,
          tx: transaction,
        }
      );
    }
  }
}

/**
 * A pre-configured fallback provider
 */
export class CustomProvider extends CustomFallbackProvider {
  constructor(network: 'mainnet' | 'testnet') {
    switch (network) {
      case 'mainnet':
        const providers = [
          new CustomJsonRpcProvider(
            'https://rpc-mumbai.mainnet.eraswap.network',
            {
              name: 'EraSwapNetwork',
              chainId: 5197,
              ensAddress: addresses['production'].ESN.kycdapp,
            }
          ),
          new CustomJsonRpcProvider('https://mainnet.eraswap.network', {
            name: 'EraSwapNetwork',
            chainId: 5197,
            ensAddress: addresses['production'].ESN.kycdapp,
          }),
        ];
        super(providers);
        break;
      case 'testnet':
        super([
          new CustomJsonRpcProvider('https://testnet.eraswap.network', {
            name: 'EraSwapNetwork',
            chainId: 5196,
            ensAddress: addresses['development'].ESN.kycdapp,
          }),
        ]);
        break;
      default:
        throw new Error(
          `CustomProvider needs 'mainnet' or 'testnet' as constructor arg`
        );
    }
  }
}
