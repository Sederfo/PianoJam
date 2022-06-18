import React, {Fragment} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function RoomListItem(props) {
    
  return (
    <Fragment>
        <CardContent style={{ border:"1px solid black", borderRadius:"5px", width:"100%", display:"flex", alignItems:"center"}}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
            {props.room.roomId}
            </Grid>
            <Grid item> 
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Grid item>
                        {props.room.onlineUsers.length == props.room.maxPlayers ? <Button onClick={()=>props.navigateToRoom(props.room.roomId)} disabled style={{color:"grey"}}>Join Room</Button> :
                        <Button onClick={()=>props.navigateToRoom(props.room.roomId)} style={{color:"black"}}>Join Room</Button>}
                        
                    </Grid>
                    <Grid item>
                        {props.room.onlineUsers.length}/{props.room.maxPlayers}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </CardContent>
    </Fragment>
  )
}
