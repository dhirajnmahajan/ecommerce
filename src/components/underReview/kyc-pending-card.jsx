import { Card, CardContent, Typography, Box } from "@mui/material";

export default function KycUnderReviewCard() {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        p: 2,
        textAlign: "center",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box>
          <Typography variant="h5" gutterBottom>
            KYC Under Review
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Your KYC details are currently under review. This process may take
            may take time.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
