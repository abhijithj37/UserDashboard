import { UserData } from "../Types/type";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDelete } from "../Utils/api";

const UserCard = (props: UserData) => {
  const deleteUser = useDelete();
  const handleDeleteUser = (email: string) => {
    deleteUser(email);
  };
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            pt: "56.25%",
          }}
          image={props.picture.large}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {props.name.title + " " + props.name.first + " " + props.name.last}
          </Typography>
          <Typography color={"darkgray"}>{props.email}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleDeleteUser(props.email)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default UserCard;
