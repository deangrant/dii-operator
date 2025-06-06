import React from 'react';
import { Box, Typography } from '@mui/material';
import { CopyButton } from '../CopyButton';

/**
 * Defines the properties interface for the results display component. This
 * component renders a title, a value, and a copy button.
 *
 * @interface ResultDisplayProps
 * @property {string} title - The heading text displayed above the result value.
 * @property {string} value - The value of the result, which is displayed in a
 * monospace font and can be copied to the clipboard.
 * @property {string} field - The field of the result, used for tracking or
 * logging purposes.
 */
interface ResultDisplayProps {
  title: string;
  value: string;
  field: string;
}

/**
 * A reusable component that presents data in a structured format with a title,
 * value, and copy functionality. It's designed to display technical or
 * code-like information in a clean, readable format.
 *
 * @param {ResultDisplayProps} props - The properties for the result display
 * component.
 * @param {string} props.title - The heading text displayed above the result
 * value.
 * @param {string} props.value - The value of the result, which is displayed in
 * a monospace font and can be copied to the clipboard.
 * @param {string} props.field - The field of the result, used for tracking or
 * logging purposes.
 * @returns {React.FC<ResultDisplayProps>} A React functional component that
 * renders a result display component with a title, value, and copy button.
 */
export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  title,
  value,
  field,
}) => {
  return (
    <Box>
      {/* Renders the title section with the primary color and a gap between the
      title and the value. */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {title}
      </Typography>

      {/* Renders the container for the value display with a relative position
      to allow the copy button to be positioned absolutely. */}
      <Box sx={{ position: 'relative' }}>
        {/* Renders the value display with a monospace font, a grey background,
        padding, rounded corners, and a border. */}
        <Typography
          variant="body1"
          sx={{
            wordBreak: 'break-all',
            fontFamily: 'monospace',
            bgcolor: 'grey.50',
            p: 2,
            pr: 6,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {/* Renders the value with a fallback of a dash if the value is
            empty. */}
          {value || '-'}
        </Typography>

        {/* Renders the copy button with an absolute position to the right of
          the value display. */}
        {value && (
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <CopyButton text={value} field={field} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
