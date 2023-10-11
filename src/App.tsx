import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useGetData } from "./Utils/api";
import Header from "./Components/Header";
import UsersList from "./Components/UsersList";

const defaultTheme = createTheme();

const App = () => {
  useGetData();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <UsersList />
    </ThemeProvider>
  );
};

export default App;
