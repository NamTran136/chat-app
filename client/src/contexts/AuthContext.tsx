import { createContext, useEffect, useState } from "react";
import { AuthContextType, LoggedInUser, User } from "../utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextType>({
  loggedInUser: { isAuthenticated: false, user: null },
  setLoggedInUser: () => {},
  showLoading: true,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    isAuthenticated: false,
    user: null,
  });
  const [showLoading, setShowLoading] = useState<boolean>(true);
  useEffect(() => {
    const authUser = async () => {
      setShowLoading(true);
        try {
          const token = Cookies.get('token') as string;
          if (Boolean(token)) {
            const user = jwtDecode<User>(token);
            setLoggedInUser({
              isAuthenticated: true,
              user,
            });
            Cookies.set("token", token, {
              expires: 7,
              secure: true,
            });
            if (pathname === "/auth") {
              navigate("/");
            }
          }
          else {
            navigate("/auth");
          }
        } catch (error: any) {
          console.log(error);
          navigate("/auth")
        }
      setShowLoading(false);
    };
    authUser();
  }, [ navigate, pathname]);
  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser, showLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
