import { useUserContext } from "../Context/UserDataProvider";
import { UserData } from "../Types/type";
import UserCard from "./UserCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { CircularProgress, Box } from "@mui/material";

const UsersList = () => {
  const { users, loading } = useUserContext();

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="70vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {users?.map((user: UserData) => (
              <UserCard key={user.email} {...user}></UserCard>
            ))}
          </Grid>
        )}
      </Container>
    </main>
  );
};

export default UsersList;
