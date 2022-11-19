import React from 'react'
import { Grid,Paper, Avatar, TextField, Button,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const Signup=()=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Set username' fullWidth required/>
                <TextField label='Password' placeholder='Set password' type='password' fullWidth required/>
                <TextField label='Password' placeholder='Re-Enter password' type='password' fullWidth required/>
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>
            </Paper>
        </Grid>
    )
}

export default Signup