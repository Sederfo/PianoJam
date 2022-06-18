import Paper from '@mui/material/Paper';

export default function ChatMessage(props) {
  return (
    <Paper style={{opacity:0.5}}><div>{props.username}:{props.message}</div></Paper>
  );
}
 