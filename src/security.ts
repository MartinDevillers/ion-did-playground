import {
  DID,
  generateKeyPair,
  KeyPair,
  PrivateJWK,
  PublicJWK,
  resolve,
  sign,
  verify,
} from "@decentralized-identity/ion-tools"

export async function createKeyPair(): Promise<KeyPair> {
  return generateKeyPair()
}

export async function createDID(publicKeyJwk: PublicJWK): Promise<DID> {
  return new DID({
    content: {
      publicKeys: [
        {
          id: "key-1",
          type: "EcdsaSecp256k1VerificationKey2019",
          publicKeyJwk,
          purposes: ["authentication"],
        },
      ],
      services: [
        {
          id: "domain-1",
          type: "LinkedDomains",
          serviceEndpoint: "https://getportabl.com",
        },
      ],
    },
  })
}

export async function resolveDID(longFormDID: string): Promise<any> {
  return resolve(longFormDID)
}

export async function signMessage(message: string, privateJwk: PrivateJWK): Promise<string> {
  return sign({ payload: message, privateJwk })
}

export async function verifySignedMessage(jws: string, publicJwk: PublicJWK): Promise<boolean> {
  return verify({ jws, publicJwk }).catch(() => false)
}
