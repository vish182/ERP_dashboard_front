import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { getUsersList, updateUser } from "../auth/firestore_auth";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { isAuthorized, isAdmin } from "../auth/utility";

const Users = (props) => {
  const [usersList, setUsersList] = useState([]);

  const { currentUserDoc } = useAuth();

  const loadUsersList = async () => {
    let data = await getUsersList();
    setUsersList(data);
    //console.log("array: ", data);
  };

  useEffect(() => {
    loadUsersList();
  }, []);

  const updateUserHandler = ({ role, email_id, activation, sendMail }) => {
    return () => {
      updateUser({
        role: role,
        email: email_id,
        activation: activation,
        sendMail: sendMail ? sendMail : false,
      });
    };
  };

  // const changeActivationHandler = ({ activation, email_id }) => {
  //   return () => {
  //     updateUserActivation({ activation: activation, email: email_id });
  //   };
  // };

  const getRole = ({ role }) => {
    if (role < 1) {
      return "Unauthorized";
    } else if (role == 1) {
      return "Authorized";
    } else {
      return "Admin";
    }
  };

  return (
    <Card {...props}>
      <CardHeader subtitle={`total`} title="Users" />
      <Divider />
      <List>
        {usersList.map((user, i) => {
          if (user.email_id !== currentUserDoc.email_id) {
            return (
              <ListItem divider={i < usersList.length - 1} key={i}>
                <ListItemText
                  primary={user.email_id}
                  secondary={getRole({ role: user.role })}
                />
                <IconButton edge="end" size="small">
                  {!user.activation && (
                    <Button
                      variant="contained"
                      onClick={updateUserHandler({
                        activation: true,
                        email_id: user.email_id,
                        role: user.role ? user.rle : 0,
                        sendMail: true,
                      })}
                    >
                      Activate
                    </Button>
                  )}

                  {user.activation && (
                    <Button
                      variant="contained"
                      s
                      color="error"
                      onClick={updateUserHandler({
                        activation: false,
                        email_id: user.email_id,
                        role: user.role,
                      })}
                    >
                      De-Activate
                    </Button>
                  )}
                </IconButton>
                <IconButton edge="end" size="small">
                  {!isAuthorized({ role: user.role }) && (
                    <Button
                      variant="contained"
                      onClick={updateUserHandler({
                        role: 1,
                        email_id: user.email_id,
                        activation: user.activation,
                      })}
                    >
                      Authorize
                    </Button>
                  )}

                  {isAuthorized({ role: user.role }) && (
                    <Button
                      variant="contained"
                      s
                      color="error"
                      onClick={updateUserHandler({
                        role: 0,
                        email_id: user.email_id,
                        activation: user.activation,
                      })}
                    >
                      Unauthorize
                    </Button>
                  )}
                </IconButton>
                <IconButton edge="end" size="small">
                  {!isAdmin({ role: user.role }) && (
                    <Button
                      variant="contained"
                      onClick={updateUserHandler({
                        role: 2,
                        email_id: user.email_id,
                        activation: user.activation,
                      })}
                    >
                      Make Admin
                    </Button>
                  )}

                  {isAdmin({ role: user.role }) && (
                    <Button
                      variant="contained"
                      s
                      color="error"
                      onClick={updateUserHandler({
                        role: 1,
                        email_id: user.email_id,
                        activation: user.activation,
                      })}
                    >
                      Remove Admin
                    </Button>
                  )}
                </IconButton>
              </ListItem>
            );
          }
        })}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button> */}
      </Box>
      {/* <div>{JSON.stringify(currentUserDoc)}</div> */}
    </Card>
  );
};

export default Users;
