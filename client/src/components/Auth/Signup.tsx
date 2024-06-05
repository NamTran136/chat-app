import { Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import CustomTextField from "../../Custom/CustomTextField";
import CustomButton from "../../Custom/CustomButton";
import useAuth from "../../hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const theme = useTheme();
  const { handleSignup, handleSignupDataChange, signupData, loading } =
    useAuth();
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
          Sign Up
        </Typography>
        <CustomTextField
          value={signupData?.email}
          placeholder="Enter your email"
          label="Email"
          required
          size="small"
          type="email"
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleSignupDataChange({
              key: "email",
              value: event?.target.value,
            });
          }}
        />
        <CustomTextField
          value={signupData?.fullName}
          placeholder="Enter your full name"
          label="Full Name"
          required
          size="small"
          type="text"
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleSignupDataChange({
              key: "fullName",
              value: event?.target.value,
            });
          }}
        />
        <CustomTextField
          value={signupData?.password}
          placeholder="Enter your password"
          label="Password"
          type={signupData?.showP ? "text" : "password"}
          required
          size="small"
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleSignupDataChange({
              key: "password",
              value: event?.target.value,
            });
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleSignupDataChange({
                    key: "showP",
                    value: !signupData?.showP,
                  });
                }}
              >
                {signupData?.showP ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <CustomTextField
          value={signupData?.cPassword}
          placeholder="Confirm your password"
          label="Password"
          type={signupData?.showCP ? "text" : "password"}
          required
          size="small"
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            handleSignupDataChange({
              key: "cPassword",
              value: event?.target.value,
            });
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleSignupDataChange({
                    key: "showCP",
                    value: !signupData?.showCP,
                  });
                }}
              >
                {signupData?.showCP ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <CustomButton
          loading={loading === "signup"}
          disabled={loading === "signup"}
          variant="contained"
          onClick={() => {
            handleSignup();
          }}
        >
          Sign Up
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default Signup;
