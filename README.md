# NFT-formatter

<p align="center">
  <p align="left">
    A library to fetch and display Ethereum/Solana (more chains support soon) NFTs in a common format provided any wallet.
    Built as an internal utility.
  </p>
</p>

# Installation

```bash
# install peer dependencies
npm install @solana/spl-token @solana/web3.js
```

# Running sample React App

```bash
cd sample-react-app
npm install
npm start
```

# Basic Usage
```ts
import { FetchNFTClient } from 'fetch-format-nft/dist'

// Initialize fetch client
const fetchClient = new FetchNFTClient()

// Fetching all collectibles for the given wallets
fetchClient.getCollectibles({
  ethWallets: ['...'],
  solWallets: ['...']
}).then(res => console.log(res))
```

By default, fetch-nft uses the public Opensea API and the Solana mainnet RPC endpoint. To configure API keys and endpoints, see [Usage With Configs](#usage-with-configs).

# Fetch Client
FetchNFTClient is the primary interface for using the library. When initializing the client, you may optionally pass in configs for the Open Sea and Solana clients used internally.

# Output Types
### Collectible
```ts
type Collectible = {
  id: string
  tokenId: string
  name: string | null
  description: string | null
  mediaType: CollectibleMediaType
  frameUrl: string | null
  imageUrl: string | null
  gifUrl: string | null
  videoUrl: string | null
  threeDUrl: string | null
  isOwned: boolean
  dateCreated: string | null
  dateLastTransferred: string | null
  externalLink: string | null
  permaLink: string | null
  assetContractAddress: string | null
  chain: Chain
  wallet: string
}
```

# Usage with Configs
```ts

// Open Sea Config
const openSeaConfig = {
    apiEndpoint: '...',
    apiKey: '...',
    assetLimit: 50,
    eventLimit: 300
}

// Solana Config
const solanaConfig = {
    rpcEndpoint: '...'
}

// Initialize fetch client with configs
const fetchClient = new FetchNFTClient({ openSeaConfig, solanaConfig })

// Fetching Ethereum collectibles for the given wallets
fetchClient.getEthereumCollectibles([...]).then(res => console.log(res))

// Fetching Solana collectibles for the given wallets
fetchClient.getSolanaCollectibles([...]).then(res => console.log(res))
```
