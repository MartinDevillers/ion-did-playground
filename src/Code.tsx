import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/palenight"
import { Box } from "@mui/material"

interface CodeProps {
  title: string
  code: string
}

theme.plain.backgroundColor = "rgb(20,21,23)"

export default function Code({ title, code }: CodeProps) {
  return (
    <Box bgcolor="rgb(20,21,23)" borderRadius={0.5} px={2} py={1}>
      {title}
      <Highlight {...defaultProps} theme={theme} code={code} language="json">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            component="pre"
            sx={{
              my: 0.5,
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                height: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgb(20,21,23)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgb(114,115,116)",
                borderRadius: 1,
              },
            }}
            className={className}
            style={style}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Box>
        )}
      </Highlight>
    </Box>
  )
}
