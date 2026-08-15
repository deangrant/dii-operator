import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import type { CopyButtonProps } from "./index.types";

/**
 * Copies a string to the clipboard and briefly shows a success affordance.
 */
export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // Brief confirmation before restoring the default tooltip/icon.
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
      <IconButton
        onClick={handleCopy}
        sx={{
          color: copied ? "success.main" : "primary.main",
        }}
      >
        {copied ? <CheckIcon /> : <ContentCopyIcon />}
      </IconButton>
    </Tooltip>
  );
};
