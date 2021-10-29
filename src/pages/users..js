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
import { getUsersList, updateUserRole } from "../auth/firestore_auth";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { isAuthorized } from "../auth/utility";

const Users = (props) => {
  const [usersList, setUsersList] = useState([]);

  const { currentUserDoc } = useAuth();

  const loadUsersList = async () => {
    let data = await getUsersList();
    setUsersList(data);
    console.log("array: ", data);
  };

  useEffect(() => {
    loadUsersList();
  }, []);

  const changeRoleHandler = ({ role, email_id }) => {
    return () => {
      updateUserRole({ role: role, email: email_id });
    };
  };

  const getRole = ({ role }) => {
    if (role < 1) {
      return "Unauthorized";
    } else {
      return "Authorized";
    }
  };

  return (
    <Card {...props}>
      <CardHeader subtitle={`total`} title="Users" />
      <Divider />
      <List>
        {usersList.map((user, i) => {
          if (user.email_id != currentUserDoc.email_id) {
            return (
              <ListItem divider={i < usersList.length - 1} key={i}>
                {/* <ListItemAvatar>
              <img
                  alt={product.name}
                  src={product.imageUrl}
                  style={{
                  height: 48,
                  width: 48
                  }}
              />
              </ListItemAvatar> */}
                <ListItemText
                  primary={user.email_id}
                  secondary={getRole({ role: user.role })}
                />
                <IconButton edge="end" size="small">
                  {!isAuthorized({ role: user.role }) && (
                    <Button
                      variant="contained"
                      onClick={changeRoleHandler({
                        role: 1,
                        email_id: user.email_id,
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
                      onClick={changeRoleHandler({
                        role: 0,
                        email_id: user.email_id,
                      })}
                    >
                      Unauthorize
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
