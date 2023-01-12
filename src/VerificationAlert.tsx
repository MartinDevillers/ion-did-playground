import * as React from "react"
import { Alert } from "@mui/lab"

export type VerificationStatus = "not-verified" | "verified" | "invalid"

interface VerificationAlertProps {
  status: VerificationStatus
}

export default function VerificationAlert({ status }: VerificationAlertProps) {
  switch (status) {
    case "invalid":
      return (
        <Alert variant="outlined" severity="error">
          The signed message is <strong>invalid</strong>.
        </Alert>
      )
    case "verified":
      return (
        <Alert variant="outlined" severity="success">
          The signed message is <strong>valid</strong>.
        </Alert>
      )
    default:
      return (
        <Alert variant="outlined" severity="info">
          Press &lsquo;Verify&rsquo; to verify the signed message.
        </Alert>
      )
  }
}
