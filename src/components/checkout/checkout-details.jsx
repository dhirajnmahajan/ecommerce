import { Box, Stack, Typography } from "@mui/material";

export const CheckOutDetails = ({ title, value }) => {
  return (
    <Box>
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Typography> {title}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    </Box>
  );
};
