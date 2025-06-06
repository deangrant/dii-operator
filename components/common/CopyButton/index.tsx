import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

/**
 * Defines properties interface for the copy button component.
 *
 * @interface CopyButtonProps
 * @property {string} text - The text context to be copied in the clipboard when
 * the button is clicked.
 * @property {string} field - The identifier or name of the field being copied,
 * used for tracking or logging purposes.
 */
interface CopyButtonProps {
  text: string;
  field: string;
}

/**
 * A reusable component that provides a copy button with a tooltip to indicate
 * whether the text has been copied or not.
 *
 * @param {CopyButtonProps} props - The properties for the copy button
 * component.
 * @param {string} props.text - The text context to be copied in the clipboard
 * when the button is clicked.
 * @param {string} props.field - The identifier or name of the field being
 * copied, used for tracking or logging purposes.
 * @returns {React.FC<CopyButtonProps>} A React functional component that
 * renders a copy button with a tooltip to indicate whether the text has been
 * copied or not.
 */
export const CopyButton: React.FC<CopyButtonProps> = ({ text, field }) => {
  /**
   * A state variable to track whether the text has been copied or not.
   * @type {boolean}
   */
  const [copied, setCopied] = useState<boolean>(false);

  /**
   * Handles the copy operation to the clipboard, attempts to copy the text to
   * the clipboard and shows a tooltip to indicate whether the text has been
   * copied or not.
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // Resets the state after 2 seconds to show the tooltip for a short
      // period of time.
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  /**
   * Renders the tooltip with the appropriate icon and text based on the copy
   * state. The tooltip is shown when the button is clicked and the text has
   * been copied or not.
   */
  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
      <IconButton
        onClick={handleCopy}
        sx={{
          color: copied ? 'success.main' : 'primary.main',
        }}
      >
        {copied ? <CheckIcon /> : <ContentCopyIcon />}
      </IconButton>
    </Tooltip>
  );
};
