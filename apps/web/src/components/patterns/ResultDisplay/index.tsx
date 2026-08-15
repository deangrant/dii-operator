import { Box, Typography } from "@mui/material";
import { CopyButton } from "@/components/core/CopyButton";
import type { ResultDisplayProps } from "./index.types";

/**
 * Renders a titled monospace value with an optional clipboard control.
 */
export const ResultDisplay = ({ title, value }: ResultDisplayProps) => (
  <Box>
    <Typography
      gutterBottom
      sx={{
        alignItems: "center",
        color: "primary.main",
        display: "flex",
        fontWeight: 600,
        gap: 1,
      }}
      variant="h6"
    >
      {title}
    </Typography>

    <Box sx={{ position: "relative" }}>
      <Typography
        sx={{
          bgcolor: "grey.50",
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 1,
          fontFamily: "monospace",
          p: 2,
          pr: 6,
          wordBreak: "break-all",
        }}
        variant="body1"
      >
        {value || "-"}
      </Typography>

      {value ? (
        <Box
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CopyButton text={value} />
        </Box>
      ) : null}
    </Box>
  </Box>
);
