/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { CharityDapp } from "./CharityDapp";

export class CharityDappFactory extends ContractFactory {
  static deploy(): CharityDapp | PromiseLike<CharityDapp> {
    throw new Error('Method not implemented.');
  }
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<CharityDapp> {
    return super.deploy(overrides || {}) as Promise<CharityDapp>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CharityDapp {
    return super.attach(address) as CharityDapp;
  }
  connect(signer: Signer): CharityDappFactory {
    return super.connect(signer) as CharityDappFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CharityDapp {
    return new Contract(address, _abi, signerOrProvider) as CharityDapp;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "proposalAddress",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "Sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "Comments",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "proposalAddress",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donorAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Donated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposalAddress",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_campaigner",
        type: "address",
      },
    ],
    name: "ProposalAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposalAddress",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "ProposalAproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposalAddress",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "ProposalClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Admin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposalAddress",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "poolDonation",
        type: "uint256",
      },
    ],
    name: "CharityPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposalAddress",
        type: "bytes32",
      },
    ],
    name: "Support",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposalAddress",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "addComments",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addToCharityPool",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposalAddress",
        type: "bytes32",
      },
    ],
    name: "approveProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "campaigns",
    outputs: [
      {
        internalType: "string",
        name: "PraposalHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "proposalTitle",
        type: "string",
      },
      {
        internalType: "address",
        name: "Campaigner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "fullExtraction",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "proposalApproved",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "fundRaisingDeadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundingGoal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raisedFunds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimedFunds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "support",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposalAddress",
        type: "bytes32",
      },
    ],
    name: "claimFunds",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "dayswappers",
    outputs: [
      {
        internalType: "contract IDayswappers",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_proposalAddress",
        type: "bytes32",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "donateToCharityPool",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCharityPool",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "kycDapp",
    outputs: [
      {
        internalType: "contract IKycDapp",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fundingGoal",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_fullExtraction",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_fundRaisingDeadline",
        type: "uint256",
      },
    ],
    name: "newCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nrtManager",
    outputs: [
      {
        internalType: "contract INRTManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prepaidEs",
    outputs: [
      {
        internalType: "contract IPrepaidEs",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "randomnessManager",
    outputs: [
      {
        internalType: "contract RandomnessManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "removeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_username",
        type: "bytes32",
      },
    ],
    name: "resolveAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_username",
        type: "bytes32",
      },
    ],
    name: "resolveAddressStrict",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "resolveUsername",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "resolveUsernameStrict",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_kycDapp",
        type: "address",
      },
    ],
    name: "setKycDapp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "supportUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeallyClub",
    outputs: [
      {
        internalType: "contract ITimeAllyClub",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeallyManager",
    outputs: [
      {
        internalType: "contract ITimeAllyManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeallyPromotionalBucket",
    outputs: [
      {
        internalType: "contract ITimeAllyPromotionalBucket",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "validatorManager",
    outputs: [
      {
        internalType: "contract IValidatorManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600061001b610086565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600280546001600160a01b031916331790556000600381905560045561008a565b3390565b611fdd806100996000396000f3fe6080604052600436106101dc5760003560e01c8063722d2b3e11610102578063c37067fa11610095578063f2fde38b11610064578063f2fde38b146104db578063f4567951146104fb578063f6e4ed1014610510578063fe55bde914610530576101e3565b8063c37067fa14610493578063d4a8eec0146102f7578063dccc1b08146104a6578063f20b5b2c146104bb576101e3565b8063a32cd2d4116100d1578063a32cd2d414610434578063a7017b5214610449578063ac2d60761461045e578063bf8c31441461047e576101e3565b8063722d2b3e146103b45780638da5cb5b146103c957806398b1a44d146103de5780639eca2f1e146103fe576101e3565b806322d4963b1161017a57806367b48b181161014957806367b48b181461034c5780636a14920a146103615780636bd4bfe114610381578063704b6c0214610394576101e3565b806322d4963b146102d7578063330d68de146102f757806333b005d0146102ff5780633636ef671461032c576101e3565b80631785f53c116101b65780631785f53c146102625780631d849b30146102825780631f70693c146102a2578063208b3804146102c2576101e3565b80630aa3b7de146101e85780630d541ecb1461020a5780630df5202f14610240576101e3565b366101e357005b600080fd5b3480156101f457600080fd5b5061020861020336600461175f565b610545565b005b34801561021657600080fd5b5061022a610225366004611679565b61078f565b60405161023791906118d9565b60405180910390f35b34801561024c57600080fd5b506102556107e1565b604051610237919061186f565b34801561026e57600080fd5b5061020861027d366004611679565b610811565b34801561028e57600080fd5b5061025561029d3660046116b6565b61085c565b3480156102ae57600080fd5b5061022a6102bd366004611679565b6108af565b3480156102ce57600080fd5b5061025561094b565b3480156102e357600080fd5b506102086102f23660046116b6565b610976565b6102086109ed565b34801561030b57600080fd5b5061031f61031a366004611679565b610a7e565b60405161023791906118ce565b34801561033857600080fd5b5061031f6103473660046116ce565b610a93565b34801561035857600080fd5b50610255610ab3565b34801561036d57600080fd5b5061025561037c3660046116b6565b610ac2565b61020861038f3660046116b6565b610b27565b3480156103a057600080fd5b506102086103af366004611679565b610c4c565b3480156103c057600080fd5b50610255610c9a565b3480156103d557600080fd5b50610255610cc5565b3480156103ea57600080fd5b506102086103f9366004611679565b610cd4565b34801561040a57600080fd5b5061041e6104193660046116b6565b610d44565b6040516102379a9998979695949392919061197b565b34801561044057600080fd5b5061022a610ef4565b34801561045557600080fd5b50610255610efc565b34801561046a57600080fd5b5061020861047936600461173e565b610f27565b34801561048a57600080fd5b506102556110c5565b6102086104a13660046116b6565b6110f0565b3480156104b257600080fd5b5061025561126f565b3480156104c757600080fd5b506102086104d63660046116b6565b61129a565b3480156104e757600080fd5b506102086104f6366004611679565b611348565b34801561050757600080fd5b506102556113bb565b34801561051c57600080fd5b5061020861052b3660046116f9565b6113e6565b34801561053c57600080fd5b50610255611426565b61054d610ab3565b6001600160a01b03166360f140d8336040518263ffffffff1660e01b8152600401610578919061186f565b60206040518083038186803b15801561059057600080fd5b505afa1580156105a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c8919061169a565b6105ed5760405162461bcd60e51b81526004016105e490611bbf565b60405180910390fd5b6060336040516020016106009190611810565b604051602081830303815290604052905060008682604051602001610626929190611840565b60408051601f19818403018152918152815160209283012060008181526005845291909120895191935061065f929091908a0190611547565b506000818152600560209081526040909120875161068592600190920191890190611547565b50600081815260056020526040908190206002810180546003909201869055337fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff90921674010000000000000000000000000000000000000000881515021773ffffffffffffffffffffffffffffffffffffffff19168217905590517fb13dd738977e1bc3f15b9b0618f14f0e6b935f90dd098d36300435522efed3d39061072e9084906118d9565b60405180910390a2600090815260056020819052604082206004810196909655850181905560068501819055600785015550505060020180547fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff1690555050565b60008061079b836108af565b9050806107d95760405162461bcd60e51b815260040180806020018281038252602a815260200180611f58602a913960400191505060405180910390fd5b90505b919050565b600061080c7f4e52545f4d414e4147455200000000000000000000000000000000000000000061085c565b905090565b6002546001600160a01b0316331461083b5760405162461bcd60e51b81526004016105e490611e46565b6001600160a01b03166000908152600760205260409020805460ff19169055565b60008061086883610ac2565b90506001600160a01b0381166107d95760405162461bcd60e51b8152600401808060200182810382526026815260200180611f826026913960400191505060405180910390fd5b600154604080517f1f70693c0000000000000000000000000000000000000000000000000000000081526001600160a01b03848116600483015291516000939290921691631f70693c91602480820192602092909190829003018186803b15801561091957600080fd5b505afa15801561092d573d6000803e3d6000fd5b505050506040513d602081101561094357600080fd5b505192915050565b600061080c7f444159535741505045525300000000000000000000000000000000000000000061085c565b600081815260066020908152604080832033845290915290205460ff16156109b05760405162461bcd60e51b81526004016105e490611de9565b60008181526006602090815260408083203384528252808320805460ff191660019081179091559383526005909152902060070180549091019055565b60003411610a0d5760405162461bcd60e51b81526004016105e490611c8a565b6003805434019055610a1d61094b565b6001600160a01b0316639048f53a33346040518363ffffffff1660e01b8152600401610a4a9291906118b5565b600060405180830381600087803b158015610a6457600080fd5b505af1158015610a78573d6000803e3d6000fd5b50505050565b60076020526000908152604090205460ff1681565b600660209081526000928352604080842090915290825290205460ff1681565b6001546001600160a01b031690565b600154604080517f6a14920a0000000000000000000000000000000000000000000000000000000081526004810184905290516000926001600160a01b031691636a14920a916024808301926020929190829003018186803b15801561091957600080fd5b600081815260056020526040902060028101546001600160a01b03163314610b615760405162461bcd60e51b81526004016105e490611d8c565b6002810154600160a81b900460ff16610b8c5760405162461bcd60e51b81526004016105e490611c53565b8060040154816006015410610bb35760405162461bcd60e51b81526004016105e490611cf8565b6006810154600582015460405191900390339082156108fc029083906000818181858888f19350505050158015610bee573d6000803e3d6000fd5b5060008381526005602052604090819020600690810180548401905583015490517f49108ee09c26f17b558ee6a88a30e73ee6c76e45f492f28523f7044064f93bd991610c3f9186919086906118e2565b60405180910390a1505050565b6002546001600160a01b03163314610c765760405162461bcd60e51b81526004016105e490611e46565b6001600160a01b03166000908152600760205260409020805460ff19166001179055565b600061080c7f54494d45414c4c595f4d414e414745520000000000000000000000000000000061085c565b6000546001600160a01b031690565b33610cdd610cc5565b6001600160a01b031614610d38576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2043414c4c45525f49535f4e4f545f5448455f4f574e4552604482015290519081900360640190fd5b610d4181611451565b50565b60056020908152600091825260409182902080548351601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001861615020190931692909204918201849004840281018401909452808452909291839190830182828015610df95780601f10610dce57610100808354040283529160200191610df9565b820191906000526020600020905b815481529060010190602001808311610ddc57829003601f168201915b505050505090806001018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e975780601f10610e6c57610100808354040283529160200191610e97565b820191906000526020600020905b815481529060010190602001808311610e7a57829003601f168201915b505050506002830154600384015460048501546005860154600687015460079097015495966001600160a01b0385169660ff74010000000000000000000000000000000000000000870481169750600160a81b909604909516948a565b600454470390565b600061080c7f54494d45414c4c595f50524f4d4f54494f4e414c5f4255434b4554000000000061085c565b3360009081526007602052604090205460ff16610f565760405162461bcd60e51b81526004016105e490611a4b565b600082815260056020526040812090610f6d610ef4565b600283015490915074010000000000000000000000000000000000000000900460ff161515600114610fb15760405162461bcd60e51b81526004016105e490611b3c565b81600501548260040154038111610fda5760405162461bcd60e51b81526004016105e490611bf6565b81600501548260040154038311156110045760405162461bcd60e51b81526004016105e490611a82565b6002820154600160a81b900460ff1661102f5760405162461bcd60e51b81526004016105e4906119ee565b600084815260056020526040902060030154421161105f5760405162461bcd60e51b81526004016105e490611adf565b600084815260056020819052604091829020810180548601905583015460048401549151339287927f54c25c010675db5311551a80c00f48292c63e3d9072b58265bc8340584ef5af4926110b79291909103906118d9565b60405180910390a350505050565b600061080c7f52414e444f4d4e4553535f4d414e41474552000000000000000000000000000061085c565b60008181526005602052604090203461111b5760405162461bcd60e51b81526004016105e490611eda565b6002810154600160a81b900460ff166111465760405162461bcd60e51b81526004016105e490611e7d565b600082815260056020819052604090912060048101549101541061117c5760405162461bcd60e51b81526004016105e490611d55565b60008281526005602052604090206003015442106111ac5760405162461bcd60e51b81526004016105e490611cc1565b600581018054349081019091556004805490910190556111ca61094b565b6001600160a01b0316639048f53a33346040518363ffffffff1660e01b81526004016111f79291906118b5565b600060405180830381600087803b15801561121157600080fd5b505af1158015611225573d6000803e3d6000fd5b50505050336001600160a01b0316827f54c25c010675db5311551a80c00f48292c63e3d9072b58265bc8340584ef5af43460405161126391906118d9565b60405180910390a35050565b600061080c7f54494d45414c4c595f434c55420000000000000000000000000000000000000061085c565b3360009081526007602052604090205460ff166112c95760405162461bcd60e51b81526004016105e490611a4b565b600081815260056020526040908190206002810180547fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff16600160a81b179055600481015491517f69c23674b04942822a0856d936c6a3fe137ddd1aecfcd8e0570b458b4673ce189261133d9285926118e2565b60405180910390a150565b611350611480565b6000546001600160a01b039081169116146113b2576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2043414c4c45525f49535f4e4f545f5448455f4f574e4552604482015290519081900360640190fd5b610d4181611484565b600061080c7f505245504149445f45530000000000000000000000000000000000000000000061085c565b817fcd2268d35c37a8155c87e017d347ddac91c232a19b1b56d2c1a5a2a8c57cbed033834260405161141a93929190611883565b60405180910390a25050565b600061080c7f56414c494441544f525f4d414e4147455200000000000000000000000000000061085c565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b3390565b6001600160a01b0381166114df576040805162461bcd60e51b815260206004820152601f60248201527f4f776e61626c653a204e45575f4f574e45525f49535f5a45524f5f4144445200604482015290519081900360640190fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261157d57600085556115c3565b82601f1061159657805160ff19168380011785556115c3565b828001600101855582156115c3579182015b828111156115c35782518255916020019190600101906115a8565b506115cf9291506115d3565b5090565b5b808211156115cf57600081556001016115d4565b80356001600160a01b03811681146107dc57600080fd5b600082601f83011261160f578081fd5b813567ffffffffffffffff8082111561162457fe5b6040516020601f19601f850116820101818110838211171561164257fe5b60405282815292508284830160200186101561165d57600080fd5b8260208601602083013760006020848301015250505092915050565b60006020828403121561168a578081fd5b611693826115e8565b9392505050565b6000602082840312156116ab578081fd5b815161169381611f49565b6000602082840312156116c7578081fd5b5035919050565b600080604083850312156116e0578081fd5b823591506116f0602084016115e8565b90509250929050565b6000806040838503121561170b578182fd5b82359150602083013567ffffffffffffffff811115611728578182fd5b611734858286016115ff565b9150509250929050565b60008060408385031215611750578182fd5b50508035926020909101359150565b600080600080600060a08688031215611776578081fd5b853567ffffffffffffffff8082111561178d578283fd5b61179989838a016115ff565b965060208801359150808211156117ae578283fd5b506117bb888289016115ff565b9450506040860135925060608601356117d381611f49565b949793965091946080013592915050565b600081518084526117fc816020860160208601611f1d565b601f01601f19169290920160200192915050565b60609190911b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016815260140190565b60008351611852818460208801611f1d565b835190830190611866818360208801611f1d565b01949350505050565b6001600160a01b0391909116815260200190565b60006001600160a01b0385168252606060208301526118a560608301856117e4565b9050826040830152949350505050565b6001600160a01b03929092168252602082015260400190565b901515815260200190565b90815260200190565b600060608201858352602085818501526060604085015282855460018082166000811461191657600181146119345761196c565b607f6002840416865260ff198316608089015260a08801935061196c565b600283048087526119448a611f11565b885b828110156119625781548b820160800152908401908701611946565b8a01608001955050505b50919998505050505050505050565b600061014080835261198f8184018e6117e4565b905082810360208401526119a3818d6117e4565b6001600160a01b039b909b16604084015250509615156060880152941515608087015260a086019390935260c085019190915260e08401526101008301526101209091015292915050565b60208082526028908201527f5468652070726f706f73616c2069732079657420746f2067657420746865206160408201527f7070726f76616c73000000000000000000000000000000000000000000000000606082015260800190565b6020808252601e908201527f41646d696e203a20796f7520617265206e6f7420417574686f72697a65640000604082015260600190565b60208082526028908201527f54686520707261706f73616c20646f65736e2774206e65656420736f206d756360408201527f6820616d6f756e74000000000000000000000000000000000000000000000000606082015260800190565b6020808252602c908201527f5468652070726f706f73616c2066756e64696e6720706572696f642073686f7560408201527f6c6420626520636c6f7365640000000000000000000000000000000000000000606082015260800190565b60208082526050908201527f546869732077696c6c206f6e6c79206170706c696361626c6520666f7220746860408201527f6f73652070726f706f73616c2077686f207769736820746f207261697365206660608201527f756c6c2066756e64696e6720676f616c00000000000000000000000000000000608082015260a00190565b6020808252601d908201527f43686172697479446170703a204b59435f4e4f545f415050524f564544000000604082015260600190565b60208082526033908201527f54686520706f6f6c2073686f756c64206861766520656e6f75676820746f6b6560408201527f6e7320666f72207468652070726f706f73616c00000000000000000000000000606082015260800190565b6020808252601f908201527f5468652070726f706f73616c2073686f756c6420626520617070726f76656400604082015260600190565b60208082526012908201527f496e73756666696369656e742066756e64730000000000000000000000000000604082015260600190565b6020808252601b908201527f5468652043616d706169676e20686173206265656e20656e6465640000000000604082015260600190565b60208082526023908201527f5468652066756e64732068617665206265656e20616c726561647920636c616960408201527f6d65640000000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252601d908201527f5468652043616d706169676e20616368697665642069747320676f616c000000604082015260600190565b60208082526036908201527f4f6e6c79207468652043616d706169676e657220697320617574686f7269736560408201527f6420746f20636c61696d6564207468652066756e647300000000000000000000606082015260800190565b60208082526026908201527f596f75206861766520616c726561647920737570706f7274207468697320636160408201527f6d706169676e0000000000000000000000000000000000000000000000000000606082015260800190565b6020808252601e908201527f476f7665726e3a20796f7520617265206e6f7420417574686f72697a65640000604082015260600190565b60208082526028908201527f5468652070726f706f73616c2066756e64696e67206973206e6f74204170707260408201527f6f76656420796574000000000000000000000000000000000000000000000000606082015260800190565b60208082526011908201527f496e73756666696369656e742046756e64000000000000000000000000000000604082015260600190565b60009081526020902090565b60005b83811015611f38578181015183820152602001611f20565b83811115610a785750506000910152565b8015158114610d4157600080fdfe52656769737472793a205245534f4c5645445f4e554c4c5f555345524e414d455f494e5f53545249435452656769737472793a205245534f4c5645445f5a45524f5f414444525f494e5f535452494354a26469706673582212203a1f256cc288e573d03bd29f5abe5e5d0cc7219966bf4911ff3c3dcd29baedbd64736f6c63430007050033";
