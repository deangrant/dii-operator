import { useRef, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { processCSV } from '@/utils/csv/process';
import type { ProcessedData } from '@/types/csv';

/**
 * Uploads a CSV of emails/phones, normalizes rows, and offers a hashed export.
 */
export const BatchNormalizer = () => {
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      setProcessedData(null);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessedData(null);

    try {
      const result = await processCSV(file);
      setProcessedData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while processing the file',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedData) return;

    const csvContent = [
      processedData.headers.join(','),
      ...processedData.rows.map((row) =>
        [row.original, row.normalized, row.sha256, row.base64].join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'processed_data.csv');
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      setProcessedData(null);
      return;
    }

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      handleFileUpload({
        target: { files: dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 400,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Batch Normalizer
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: '1200px',
            color: theme.palette.text.secondary,
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
          Upload a CSV file containing a single column of email addresses and/or
          phone numbers (up to 10,000 records). The system will automatically
          detect the type of each value, normalize it, generate SHA-256 and
          Base64-encoded hashes, and provide a downloadable CSV file with the
          results.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '200px',
              border: `2px dashed ${theme.palette.primary.main}`,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              bgcolor: 'grey.50',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={isProcessing}
            />
            <Typography variant="h6" color="primary" gutterBottom>
              Drag and drop your CSV file here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse
            </Typography>
          </Box>

          {isProcessing && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={20} />
              <Typography>Processing your file...</Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          {processedData && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Alert
                severity={processedData.rows.length > 0 ? 'success' : 'info'}
                sx={{ mb: 2 }}
              >
                {processedData.rows.length > 0 ? (
                  <>
                    Successfully processed {processedData.rows.length} records.
                    {processedData.skippedRows > 0 && (
                      <span> {processedData.skippedRows} rows skipped.</span>
                    )}
                  </>
                ) : (
                  'No valid records found in the file. Please check your input and try again.'
                )}
              </Alert>

              <Button
                variant="contained"
                color="primary"
                onClick={handleDownload}
                startIcon={<DownloadIcon />}
                disabled={!processedData || processedData.rows.length === 0}
                fullWidth
                sx={{ mt: 2, height: '48px' }}
              >
                DOWNLOAD
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
