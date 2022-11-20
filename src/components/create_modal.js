import React, { useState } from "react";
import { TextField, Button, Box } from '@material-ui/core';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const btnstyle={
    marginTop: 15,
    margin:'8px 0'
};


function CreatePost({addPost}) {

    const [title, settitle] = useState("");
    const [body, setbody] = useState("");
    

    return (
        <Box sx={style}>
            <TextField 
                label='Title'
                placeholder='Enter title'
                type='text'
                value={title}
                onChange={(e) => settitle(e.target.value)} 
                fullWidth required
            />
            <TextField
                label='Description'
                placeholder='Enter Description'
                type='text'
                value={body}
                onChange={(e) => setbody(e.target.value)} 
                fullWidth required
            />
            <Button 
                type='submit'
                color='primary'
                variant="contained"
                style={btnstyle}
                onClick={() => { addPost(title, body) }}
                fullWidth>
                Create
            </Button>
        </Box>
    )
}


export default CreatePost;