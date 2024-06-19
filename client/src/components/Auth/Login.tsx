import { Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import CustomTextField from "../Custom/CustomTextField";
import CustomButton from "../Custom/CustomButton";
import useAuth from "../../hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const theme = useTheme();
  const { loading, loginData, handleLoginDataChange, handleLogin } = useAuth();
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
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleLoginDataChange({
              key: "email",
              value: event?.target.value,
            });
          }}
        />
        <CustomTextField
          placeholder="Enter your password"
          label="Password"
          type="password"
          required
          size="small"
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleLoginDataChange({
              key: "password",
              value: event?.target.value,
            });
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleLoginDataChange({
                    key: "showP",
                    value: !loginData?.showP,
                  });
                }}
              >
                {loginData?.showP ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <CustomButton
          loading={loading === "login"}
          disabled={loading === "login"}
          onClick={() => {
            handleLogin();
          }}
          variant="contained"
        >
          Sign In
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default Login;
