import { useState } from "react";
import { SignupData } from "../utils/types";
import { userLogin, userSignup } from "../api/authApiHandlers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useAuthContext } from "./useAllContextHooks";


export default function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<"login" | "signup" | null>(null);
  const { setLoggedInUser } = useAuthContext();
  const [tabValue, setTabValue] = useState<number>(0);

  const [signupData, setSignupData] = useState<SignupData>({
    cPassword: "",
    email: "",
    fullName: "",
    imageUrl: "",
    password: "",
    showCP: false,
    showP: false,
  });
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
    showP: boolean;
  }>({ email: "", password: "", showP: false });
  function handleSignupDataChange({
    key,
    value,
  }: {
    key: string;
    value: string | boolean;
  }) {
    setSignupData((prev) => ({ ...prev, [key]: value }));
  }
  function handleLoginDataChange({
    key,
    value,
  }: {
    key: string;
    value: string | boolean;
  }) {
    setLoginData((prev) => ({ ...prev, [key]: value }));
  }
  function handleTabChange(_event: React.SyntheticEvent, newValue: number) {
    setTabValue(newValue);
  }
  async function handleSignup() {
    setLoading("signup");
    try {
      const response = await userSignup(signupData);
      console.log(response);
      if (response && response?.status === 200) {
        setLoggedInUser({ isAuthenticated: true, user: response?.data?.user });
        Cookies.set("token", response?.data?.token, {
          expires: 7,
          secure: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.toString() ?? "Failed to sign up please try again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setLoading(null);
  }
  async function handleLogin() {
    setLoading("login");
    try {
      const response = await userLogin(loginData);
      console.log(response);
      if (response && response?.status === 200) {
        setLoggedInUser({ isAuthenticated: true, user: response?.data?.user });
        Cookies.set("token", response?.data?.token, {
          expires: 7,
          secure: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.toString() ?? "Failed to log in please try again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setLoading(null);
  }
  function logout() {
    Cookies.remove("token");
    setLoggedInUser({ isAuthenticated: false, user: null });
    navigate("/auth")
  }

  return {
    signupData,
    handleSignupDataChange,
    handleSignup,
    loading,
    loginData,
    handleLoginDataChange,
    handleLogin,
    tabValue,
    handleTabChange,
    logout,
  };
}
