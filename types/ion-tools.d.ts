declare module "@decentralized-identity/ion-tools" {
  export class DID {
    constructor(options?: object)
    generateOperation(type: any, content: any, commit?: boolean): Promise<void>
    generateRequest(
      payload?: number,
      options?: object
    ): Promise<
      | import("@decentralized-identity/ion-sdk/dist/lib/models/IonCreateRequestModel.js").default
      | import("@decentralized-identity/ion-sdk/dist/lib/models/IonDeactivateRequestModel.js").default
    >
    getAllOperations(): Promise<any[]>
    getOperation(index: any): Promise<any>
    getState(): Promise<{
      shortForm: string
      longForm: string
      ops: any[]
    }>
    /**
     * returns the suffix portion of the DID string for the DID URI the class instance represents
     * @example
     * <caption>example DID URI: `did:ion:EiCZws6U61LV3YmvxmOIlt4Ap5RSJdIkb_lJXhuUPqQYBg`</caption>
     *
     * // returns: EiCZws6U61LV3YmvxmOIlt4Ap5RSJdIkb_lJXhuUPqQYBg
     * did.getSuffix()
     * @returns {string} suffix
     */
    getSuffix(): string
    /**
     * returns either the long or short form URI for the DID based on the form provided
     * @param {'long' | 'short'} form - There are two forms of ION DID URI, the Long-Form URI, which can
     * be used instantly without anchoring an ION DID, and the Short-Form URI, which is only
     * resolvable after a DID has been published to the ION network.
     * @returns {Promise<string>}
     */
    getURI(form?: "long" | "short"): Promise<string>
    #private
  }
  /**
   * generates a keypair of the type provided
   * @param {'Ed25519'| 'EdDSA' | 'secp256k1' | 'ES256K'} type
   * @returns {KeyPair}
   */
  export async function generateKeyPair(type?: "Ed25519" | "EdDSA" | "secp256k1" | "ES256K"): Promise<KeyPair>
  /**
   * signs the payload provided using the key provided
   * @param {object} params
   * @param {any} params.payload - anything JSON stringifiable.
   * @param {object} [params.header] - any properties you want included in the header. `alg` will be included for you
   * @param {PrivateJWK} params.privateJwk - the key to sign with
   * @returns {string} compact JWS
   */
  export async function sign(params?: { payload: any; header?: object; privateJwk: PrivateJWK }): Promise<string>
  /**
   *  verifies the provided JWS with the provided public key
   * @param {object} params
   * @param {string} params.jws - the compact jws to verify
   * @param {PublicJWK} params.publicJwk - the public key used to verify the signature
   * @returns {boolean}
   */
  export async function verify(params?: { jws: string; publicJwk: PublicJWK }): Promise<boolean>
  /**
   * resolves the ION DID provided
   * @param {string} didUri
   * @param {object} options
   * @param {string} [nodeEndpoint] - the resolver node
   * @returns
   */
  export function resolve(didUri: string, options?: object): Promise<any>
  export function anchor(anchorRequest: any, options?: object): Promise<any>
  export type PrivateJWK = {
    crv: "Ed25519" | "secp256k1"
    d: string
  }
  export type PublicJWK = {
    crv: "Ed25519" | "secp256k1"
    x: string
    y?: string
  }
  export type KeyPair = {
    privateJwk: PrivateJWK
    publicJwk: PublicJWK
  }
}
