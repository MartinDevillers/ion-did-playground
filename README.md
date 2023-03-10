<p align="center">
    <img alt="Battleship" width="150" src="https://raw.githubusercontent.com/MartinDevillers/ion-did-playground/main/public/logo.png" />
</p>
<h1 align="center">
  ION DID Playground
</h1>

<p align="center">
  <a href="https://github.com/MartinDevillers/ion-did-playground/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="ION DID Playground is released under the MIT license." />
  </a>
</p>

π ION is a public, permissionless, Decentralized Identifier (DID) network that implements the blockchain-agnostic Sidetree protocol on top of Bitcoin (as a βLayer 2β overlay) to support DIDs/DPKI (Decentralized Public Key Infrastructure) at scale.

[**See it in action!**](https://ion.devillers.nl)

## β¨ Features

- Generate keys using either `SECP256K1` or `ED25519`
- Create a new ION Decentralized Identifier (DID)
- Resolve an ION DID and inspect its DID Resolution Document
- Sign a message (generates a JWS output)
- Verify a signed message (verifies a JWS output) 

## π Getting Started

1. **Clone this repo.**

Use the GIT CLI to clone this repository.

```sh
git clone https://github.com/MartinDevillers/ion-did-playground.git
```

2. **Start developing.**

Navigate into your freshly cloned directory and start up the server.

```sh
cd ion-did-playground
npm install
npm run dev
```
3. **Open the code and start customizing!**

ION DID Playground is now running at `http://localhost:3000`!