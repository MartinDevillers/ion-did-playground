import * as React from "react"
import { Stack, Button, ButtonGroup, FormGroup, Link, TextField, Box, Typography, Container } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import HubOutlinedIcon from "@mui/icons-material/HubOutlined"
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined"
import Image from "next/image"
import { KeyPair } from "@decentralized-identity/ion-tools"
import Code from "../src/Code"
import Copyright from "../src/Copyright"
import { createDID, createKeyPair, resolveDID, signMessage, verifySignedMessage } from "../src/security"
import VerificationAlert, { VerificationStatus } from "../src/VerificationAlert"
import logo from "../public/logo.png"

type PageTab = "create" | "resolve" | "sign"

function prettyJson(object: any) {
  return JSON.stringify(object, null, 2)
}

function decodeJwt(jwt: string): any {
  if (!jwt) return undefined
  try {
    const [header, payload, signature] = jwt.split(".")
    const decodedHeader = atob(header)
    const decodedPayload = atob(payload)
    // const decodedSignature = atob(signature) -- ION DID uses different encoding for the signature
    return {
      header: JSON.parse(decodedHeader),
      payload: JSON.parse(decodedPayload),
      signature,
    }
  } catch (error) {
    return "Invalid JWT"
  }
}

export default function Home() {
  const [tab, setTab] = React.useState<PageTab>("create")
  const [keyPair, setKeyPair] = React.useState<KeyPair>()
  const [longFormDid, setLongFormDid] = React.useState<string>("")
  const [longFormDidForResolution, setLongFormDidForResolution] = React.useState<string>("")
  const [isResolving, setIsResolving] = React.useState<boolean>(false)
  const [dicDocJson, setDicDocJson] = React.useState<string>("")
  const [message, setMessage] = React.useState<string>("")
  const [signedMessage, setSignedMessage] = React.useState<string>("")
  const [verificationStatus, setVerificationStatus] = React.useState<VerificationStatus>("not-verified")

  const keyPairJson = React.useMemo(() => prettyJson(keyPair), [keyPair])
  const decodedSignedMessage = React.useMemo(() => prettyJson(decodeJwt(signedMessage)), [signedMessage])

  const canResolve = Boolean(longFormDidForResolution)
  const canSign = Boolean(message && keyPair)
  const canVerify = Boolean(signedMessage && keyPair)

  async function createNewDid() {
    const newKeyPair = await createKeyPair()
    const did = await createDID(newKeyPair.publicJwk)
    const didUri = await did.getURI()
    setKeyPair(newKeyPair)
    setLongFormDid(didUri)
  }

  async function copyDidToClipboard() {
    navigator.clipboard.writeText(longFormDid)
  }

  async function pasteDidFromClipboard() {
    const didUri = await navigator.clipboard.readText()
    setLongFormDidForResolution(didUri)
  }

  async function resolveDid() {
    setIsResolving(true)
    const didDoc = await resolveDID(longFormDidForResolution)
    const jsonDidDoc = prettyJson(didDoc)
    setDicDocJson(jsonDidDoc)
    setIsResolving(false)
  }

  async function sign() {
    if (!keyPair) return
    const signed = await signMessage(message, keyPair.privateJwk)
    setSignedMessage(signed)
    setVerificationStatus("not-verified")
  }

  async function verify() {
    if (!keyPair) return
    const verified = await verifySignedMessage(signedMessage, keyPair.publicJwk)
    setVerificationStatus(verified ? "verified" : "invalid")
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Box>
        <Box display="flex" justifyContent="center">
          <Image src={logo} alt="ION DID Playground" />
        </Box>
        <Typography variant="subtitle1" component="h2" color="text.secondary">
          <Link href="https://identity.foundation/ion/" target="_blank">
            ION
          </Link>{" "}
          is a public, permissionless, Decentralized Identifier (DID) network that implements the blockchain-agnostic
          Sidetree protocol on top of Bitcoin (as a &lsquo;Layer 2&rsquo; overlay) to support DIDs/DPKI (Decentralized
          Public Key Infrastructure) at scale.
        </Typography>
      </Box>
      <Box
        sx={{
          my: 2,
          p: 2,
          border: "1px solid rgb(37, 38, 43)",
          borderRadius: 0.5,
        }}
      >
        <ButtonGroup
          size="large"
          variant="contained"
          disableElevation
          sx={{ mb: 4, display: "flex", justifyContent: "center" }}
        >
          <Button
            color={tab === "create" ? "primary" : "secondary"}
            startIcon={<LocalOfferOutlinedIcon />}
            onClick={() => setTab("create")}
          >
            Create
          </Button>
          <Button
            color={tab === "resolve" ? "primary" : "secondary"}
            startIcon={<HubOutlinedIcon />}
            onClick={() => setTab("resolve")}
          >
            Resolve
          </Button>
          <Button
            color={tab === "sign" ? "primary" : "secondary"}
            startIcon={<VpnKeyOutlinedIcon />}
            onClick={() => setTab("sign")}
          >
            Sign and Verify Data
          </Button>
        </ButtonGroup>
        {tab === "create" && (
          <Stack spacing={2}>
            <Stack direction="row">
              <Button variant="contained" disableElevation sx={{ borderRadius: 0.5 }} onClick={createNewDid} fullWidth>
                Create New DID
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: 0.5, ml: 2 }}
                disabled={!longFormDid}
                onClick={copyDidToClipboard}
                fullWidth
              >
                Copy DID
              </Button>
            </Stack>
            <Code title="DID" code={longFormDid || "Press 'Create New DID' to generate a new DID"} />
            <Code title="Key Pair" code={keyPairJson || "Press 'Create New DID' to generate a new key pair"} />
          </Stack>
        )}
        {tab === "resolve" && (
          <Stack spacing={2}>
            <FormGroup row>
              <TextField
                label="DID"
                size="small"
                sx={{ flexGrow: 1, "& fieldset": { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
                value={longFormDidForResolution}
                onChange={(e) => setLongFormDidForResolution(e.target.value)}
              />
              <Button variant="outlined" sx={{ borderRadius: 0 }} onClick={pasteDidFromClipboard}>
                Paste DID
              </Button>
              <LoadingButton
                variant="outlined"
                sx={{ width: 90, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={resolveDid}
                loading={isResolving}
                disabled={!canResolve}
              >
                Resolve
              </LoadingButton>
            </FormGroup>
            <Code
              title="DID Resolution Document"
              code={
                dicDocJson ||
                "Enter a ION DID Long-Form URI andd press 'Resolve' \nto view the associated DID resolution document."
              }
            />
          </Stack>
        )}
        {tab === "sign" && (
          <Stack spacing={2}>
            <FormGroup row>
              <TextField
                label="Message"
                size="small"
                placeholder="Enter a message here"
                sx={{ flexGrow: 1, "& fieldset": { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                variant="outlined"
                sx={{ width: 90, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={sign}
                disabled={!canSign}
              >
                Sign
              </Button>
            </FormGroup>
            <FormGroup row>
              <TextField
                label="Signed Message"
                size="small"
                placeholder="Press 'Sign' to sign the message"
                sx={{ flexGrow: 1, "& fieldset": { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
                value={signedMessage}
                onChange={(e) => setSignedMessage(e.target.value)}
              />
              <Button
                variant="outlined"
                sx={{ width: 90, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={verify}
                disabled={!canVerify}
              >
                Verify
              </Button>
            </FormGroup>
            <VerificationAlert status={verificationStatus} />
            <Code title="Decoded Signed Message" code={decodedSignedMessage || "Press 'Sign' to sign the message"} />
          </Stack>
        )}
      </Box>
      <Copyright />
    </Container>
  )
}
