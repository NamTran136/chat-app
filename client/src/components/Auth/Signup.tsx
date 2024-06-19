import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import CustomTextField from "../Custom/CustomTextField";
import CustomButton from "../Custom/CustomButton";
import useAuth from "../../hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Signup = () => {
  const fileRef = useRef<any | null>(null);
  const [image, setImage] = useState<any | undefined>(undefined);
  const theme = useTheme();
  const { handleSignup, handleSignupDataChange, signupData, loading } =
    useAuth();
  useEffect(()=>{
    if(image) {
      handleUploadImage(image);   
    }
  }, [image])
  const handleUploadImage = (image: any | undefined) => {
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, 'avatars/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Update is " + progress + "% done");
      },
      (error: any) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
         handleSignupDataChange({
              key: "imageUrl",
              value: downloadURL,
            })
        );
      }
    );
  }
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
        <Grid item display="flex" alignItems="center" gap={1}>
          <Badge
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              <Typography fontWeight="bold" color={theme.palette.error.main}>
                *
              </Typography>
            }
          >
            <Avatar
              src={signupData?.imageUrl ?? ""}
              onClick={() => fileRef.current.click()}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </Badge>
        </Grid>
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
