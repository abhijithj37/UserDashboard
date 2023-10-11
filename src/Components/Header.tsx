import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import { useUserContext } from "../Context/UserDataProvider";
import { useRefresh } from "../Utils/api";

const Header = () => {
  const { totalUsers, loading } = useUserContext();
  const refreshPage = useRefresh();

  const handleRefresh = () => {
    refreshPage();
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "white", color: "black", px: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={2}
          alignItems={"center"}
        >
          <PeopleIcon fontSize="medium" />
          <Typography fontWeight={"light"} color={"darkBlue"} variant="h6">
            {" "}
            {totalUsers}
          </Typography>
        </Box>

        {!loading && (
          <Button
            variant="contained"
            onClick={() => handleRefresh()}
            color="primary"
            disabled={totalUsers === 50}
            size="small"
          >
            Refresh
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
