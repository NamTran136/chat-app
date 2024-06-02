import { Grid, Paper, Typography, useTheme } from "@mui/material";
import CustomTextField from "../../Custom/CustomTextField";
import CustomButton from "../../Custom/CustomButton";

const Login = () => {
  const theme = useTheme();
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        container
        flexDirection="column"
        gap={2}
        sx={{
          width: { xs: "300px", sm: "400px", md: "500px" },
        }}
        component={Paper}
        variant="elevation"
        p={{ xs: 2, ms: 4, md: 8 }}
      >
        <Typography variant="h5" color={theme.palette.text.secondary}>
          Sign In
        </Typography>
        <CustomTextField
          placeholder="Enter your email"
          label="Email"
          required
          size="small"
          type="email"
        />
        <CustomTextField
          placeholder="Enter your password"
          label="Password"
          type="password"
          required
          size="small"
        />
        <CustomButton variant="contained">Sign In</CustomButton>
      </Grid>
    </Grid>
  );
};

export default Login;
