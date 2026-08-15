import { Download as DownloadIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { saveAs } from "file-saver";
import { useCallback, useRef, useState } from "react";
import type { ProcessedData } from "@/types/csv";
import { processCSV } from "@/utils/csv/process";

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

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
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
            : "An error occurred while processing the file",
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  const handleDownload = useCallback(() => {
    if (!processedData) {
      return;
    }

    const csvContent = [
      processedData.headers.join(","),
      ...processedData.rows.map((row) =>
        [row.original, row.normalized, row.sha256, row.base64].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "processed_data.csv");
  }, [processedData]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const file = event.dataTransfer.files?.[0];
      if (!file) {
        return;
      }

      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
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
    },
    [handleFileUpload],
  );

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: "2.5rem",
            fontWeight: 400,
            mb: 2,
          }}
          variant="h1"
        >
          Batch Normalizer
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "1200px",
          }}
          variant="body1"
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
          backgroundColor: "white",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            onClick={handleBrowseClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              "&:hover": {
                bgcolor: "grey.100",
              },
              alignItems: "center",
              bgcolor: "grey.50",
              border: `2px dashed ${theme.palette.primary.main}`,
              borderRadius: 2,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              height: "200px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <input
              accept=".csv"
              disabled={isProcessing}
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
            />
            <Typography color="primary" gutterBottom variant="h6">
              Drag and drop your CSV file here
            </Typography>
            <Typography color="text.secondary" variant="body2">
              or click to browse
            </Typography>
          </Box>

          {isProcessing ? (
            <Box sx={{ alignItems: "center", display: "flex", gap: 2 }}>
              <CircularProgress size={20} />
              <Typography>Processing your file...</Typography>
            </Box>
          ) : null}

          {error ? (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          ) : null}

          {processedData ? (
            <Box sx={{ mt: 2, width: "100%" }}>
              <Alert
                severity={processedData.rows.length > 0 ? "success" : "info"}
                sx={{ mb: 2 }}
              >
                {processedData.rows.length > 0 ? (
                  <>
                    Successfully processed {processedData.rows.length} records.
                    {processedData.skippedRows > 0 ? (
                      <span> {processedData.skippedRows} rows skipped.</span>
                    ) : null}
                  </>
                ) : (
                  "No valid records found in the file. Please check your input and try again."
                )}
              </Alert>

              <Button
                color="primary"
                disabled={!processedData || processedData.rows.length === 0}
                fullWidth
                onClick={handleDownload}
                startIcon={<DownloadIcon />}
                sx={{ height: "48px", mt: 2 }}
                variant="contained"
              >
                DOWNLOAD
              </Button>
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Box>
  );
};
