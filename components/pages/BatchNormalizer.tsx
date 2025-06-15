import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  processCSV,
  ProcessedData,
  ProcessedRow,
} from '../../utils/csv/process';
import { saveAs } from 'file-saver';
import { Download as DownloadIcon } from '@mui/icons-material';

/**
 * A component that allows users to upload a CSV file containing email addresses
 * and/or phone numbers, and then processes the data by normalizing the values,
 * generating SHA-256 and Base64 hashes, and providing a downloadable CSV file
 * with the results.
 *
 * @component
 * @returns {JSX.Element} The rendered batch normalizer component.
 */
export const BatchNormalizer: React.FC = () => {
  // The theme object provides access to the application's color palette,
  // typography, and other design properties. It is used to style the components
  // within the page.
  const theme = useTheme();

  // The state to track the processing status of the file.
  const [isProcessing, setIsProcessing] = React.useState(false);

  // The state to track the error message.
  const [error, setError] = React.useState<string | null>(null);

  // The state to track the processed data.
  const [processedData, setProcessedData] =
    React.useState<ProcessedData | null>(null);

  // The reference to the file input element.
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  /**
   * Handles the file upload event. This function is triggered when the user
   * selects a file to upload. It validates the file type and then processes the
   * file by normalizing the values, generating SHA-256 and Base64 hashes, and
   * providing a downloadable CSV file with the results.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object
   * containing the file that was uploaded.
   * @returns {Promise<void>} A promise that resolves when the file is
   * processed.
   */
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Get the file from the event target.
    const file = event.target.files?.[0];

    // Evaluate if the file is valid. If not, set the error message and return.
    if (!file) return;

    // Evaluate if the file is a CSV file. If not, set the error message and
    // return.
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      setProcessedData(null);
      return;
    }

    // Set the processing state to true and clear any existing error or
    // processed data.
    setIsProcessing(true);
    setError(null);
    setProcessedData(null);

    try {
      // Process the file and store the results.
      const result = await processCSV(file);
      setProcessedData(result);

      // If an error occurs during processing, set the error message.
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while processing the file',
      );
    } finally {
      // Set the processing state to false.
      setIsProcessing(false);
    }
  };

  /**
   * Handles the download event. This function is triggered when the user clicks
   * the download button. It creates a CSV file with the processed data and
   * downloads it.
   *
   * @returns {void} A void function that downloads the processed data as a CSV
   * file.
   */
  const handleDownload = () => {
    // Evaluate if there is no processed data. If so, return.
    if (!processedData) return;

    // Create a CSV file with the processed data.
    const csvContent = [
      processedData.headers.join(','),
      ...processedData.rows.map((row: ProcessedRow) =>
        [row.original, row.normalized, row.sha256, row.base64].join(','),
      ),
    ].join('\n');

    // Create a blob with the CSV content and download it.
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    // Download the CSV file.
    saveAs(blob, 'processed_data.csv');
  };

  /**
   * Handles the drag over event. This function is triggered when the user drags
   * over the file input element. It prevents the default behavior and stops the
   * event from propagating.
   *
   * @param {React.DragEvent} event - The event object containing the drag over
   * event.
   * @returns {void} A void function that prevents the default behavior and
   * stops the event from propagating.
   */
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /**
   * Handles the drop event. This function is triggered when the user drops a
   * file onto the file input element. It validates the file type and then
   * processes the file by normalizing the values, generating SHA-256 and Base64
   * hashes, and providing a downloadable CSV file with the results.
   *
   * @param {React.DragEvent} event - The event object containing the drop
   * event.
   * @returns {void} A void function that prevents the default behavior and
   * stops the event from propagating.
   */
  const handleDrop = (event: React.DragEvent) => {
    // Prevent the default behavior and stop the event from propagating.
    event.preventDefault();
    event.stopPropagation();

    // Get the file from the event data transfer.
    const file = event.dataTransfer.files?.[0];

    // Evaluate if the file is valid. If not, set the error message and return.
    if (file) {
      // Evaluate if the file is a CSV file. If not, set the error message and
      // return.
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        setProcessedData(null);
        return;
      }

      // Create a new data transfer object.
      const dataTransfer = new DataTransfer();

      // Add the file to the data transfer object.
      dataTransfer.items.add(file);

      // Evaluate if the file input reference is valid. If so, set the files
      // to the data transfer object and call the file upload handler.
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        handleFileUpload({
          target: { files: dataTransfer.files },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  /**
   * Renders the batch normalizer component.
   *
   * @returns {JSX.Element} The rendered batch normalizer component.
   */
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Renders the title and description of the batch normalizer
      component. */}
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

      {/* Renders the paper component that contains the file input, processing
      status, error message, and processed data. */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Renders the box component that contains the file input, processing
        status, error message, and processed data. */}
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
            {/* Renders the input element that allows the user to select a CSV
            file. */}
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

          {/* Renders the box component that contains the processing status. */}
          {isProcessing && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={20} />
              <Typography>Processing your file...</Typography>
            </Box>
          )}

          {/* Renders the alert component that contains the error message. */}
          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          {/* Renders the box component that contains the processed data. */}
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

              {/* Renders the button that allows the user to download the
              processed data. */}
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
