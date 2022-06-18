import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

const names = [
  "salamander",
  "piano",
  "bass-electric",
  "bassoon",
  "cello",
  "clarinet",
  "contrabass",
  "flute",
  "french-horn",
  "guitar-acoustic",
  "guitar-electric",
  "guitar-nylon",
  "harmonium",
  "harp",
  "organ",
  "saxophone",
  "trombone",
  "trumpet",
  "tuba",
  "violin",
  "xylophone",
];

function SoundPackMenu(props) {
  const [selectedName, setSelectedName] = React.useState("piano");

  const handleChange = (instrument) => {
    props.setSoundPack(instrument);
    setSelectedName(instrument);
  };

  return (
    <List
      dense={true}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", position: "relative",
        overflow: "auto", maxHeight: "100%", "& ul": { padding: 0 } }}>
      {names.map((instrument) => {
        return (
          <ListItem key={instrument}
            sx={ instrument === selectedName ? { backgroundColor: "#06070E", color: "#EDE0D4" } : undefined } >
            <ListItemButton selected={instrument === selectedName} onClick={() => handleChange(instrument)}  >
              {instrument}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default SoundPackMenu;
