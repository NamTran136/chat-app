import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: CustomTabPanelProps) {
  const { index, children, value } = props;
  return value === index && children;
}

const Auth = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  function handleTabChange(_event: React.SyntheticEvent, newValue: number) {
    setTabValue(newValue);
  }
  return (
    <Grid
      container
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item display="flex" flexDirection="column" gap={2} height="500px">
        <Tabs value={tabValue} onChange={handleTabChange} component={Paper}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <CustomTabPanel value={tabValue} index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Signup />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
};

export default Auth;
