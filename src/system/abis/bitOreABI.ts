export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "adjustmentInterval",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "epochLengthInBlocks",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allowedMiners",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "epochNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "challengeNumber",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "allowedMiners",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
    ],
    name: "EpochStarted",
    type: "event",
  },
  {
    inputs: [],
    name: "_MAX_DIFFICULTY",
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
    name: "_MIN_DIFFICULTY",
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
    name: "_adjustmentInterval",
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
    name: "_allowedMiners",
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
    name: "_epochLengthInBlocks",
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
    name: "adjustmentBlockHeight",
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
    name: "adjustmentBlockTime",
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
    name: "allTimeGasUsed",
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
    name: "baseMultiplier",
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
    inputs: [
      {
        internalType: "address",
        name: "minerAddress",
        type: "address",
      },
    ],
    name: "canMine",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "challengeNumber",
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
        internalType: "bytes32",
        name: "nonce",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "challenge_number",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
    ],
    name: "checkMintSolution",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentEpoch",
    outputs: [
      {
        internalType: "uint256",
        name: "minerCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startBlockNumber",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "reachedAdjustDifficulty",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "epochCount",
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
    name: "epochLengthOptimal",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "gasUsedByMiner",
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
    inputs: [
      {
        internalType: "address",
        name: "miner",
        type: "address",
      },
    ],
    name: "getDifficultyMultiplier",
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
    name: "getEpochInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "epochCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minerCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startBlockNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endBlockNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "miningTarget",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "allowedMiners",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "reachedAdjustDifficulty",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "challengeNumber",
            type: "bytes32",
          },
        ],
        internalType: "struct BitOrePow.EpochInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEpochEnded",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMultiplier",
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
    name: "minAllowedMiners",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "nonce",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "mintAddresses",
        type: "address[]",
      },
    ],
    name: "mine",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "minersLastEpoch",
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
    name: "minimumEpochLength",
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
    name: "miningTarget",
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
    name: "simpleGaussian",
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
];
