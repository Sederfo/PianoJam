import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

function PlayerList(props) {
  return (
    <List
      dense={true}
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: "100%",
        "& ul": { padding: 0 },
      }}
    >
      <ListItem style={{ display: "flex", justifyContent: "center" }}>
        {/* There is already an h1 in the page, let's not duplicate it. */}
        <h3>Players in room</h3>
      </ListItem>
      {props.onlineUsers.map((user) => {
        return (
         
            <ListItem
              style={{ display: "flex", justifyContent: "center" }}
              key={user}
            >
               {user.includes("Guest") ? <PersonOutlineIcon/> : <PersonIcon/>}
              {user}
            </ListItem>
        
        );
      })}
    </List>
  );
}

export default PlayerList;
