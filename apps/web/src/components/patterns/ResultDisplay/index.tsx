import { Box, Typography } from '@mui/material';
import { CopyButton } from '@/components/core/CopyButton';
import type { ResultDisplayProps } from './index.types';

/**
 * Renders a titled monospace value with an optional clipboard control.
 */
export const ResultDisplay = ({ title, value }: ResultDisplayProps) => {
  return (
    <Box>
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

      <Box sx={{ position: 'relative' }}>
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
          {value || '-'}
        </Typography>

        {value && (
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <CopyButton text={value} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
