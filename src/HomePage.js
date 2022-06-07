import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { useState } from 'react';
import Alert from '@mui/material/Alert';



export default function HomePage() {

    const [solanaAddress, setSolanaAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [success, setSuccess] = useState(false);


    function updateField(event) {
        setSolanaAddress(event.target.value);
    }

    function callFunction() {
        setIsLoading(true);
        const functions = getFunctions();
        if (process.env.NODE_ENV === "development") {
            console.log('NOTE: dev env');
            connectFunctionsEmulator(functions, "localhost", 5001);
        } else {
            console.log('NOTE: prod env enabled');
        }
        const sendSolanaTransaction = httpsCallable(functions, 'sendSolanaTransaction');
        sendSolanaTransaction(solanaAddress)
          .then((result) => {
            setIsLoading(false);
            setSuccess(true);
            console.log("process successful");
          }).catch(() => {
            setIsLoading(false);
            setHelperText("The transaction failed - pls check your addy. sad meep 😔 ");
            setIsError(true);
            console.log("there was a booboo");
          });
    }
    
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SOL Sender
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={2} justifyContent={"center"} p={5}>
                    <Grid item xs={12} md={6}>
                        <img style={{"maxWidth": "200px"}} src="https://firebasestorage.googleapis.com/v0/b/sol-sender.appspot.com/o/cetlien.png?alt=media&token=e80f3e67-55c8-4775-b58a-23447a916614"></img>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Enter your Solana address to receive 0.069 SOL
                        </Typography>
                        <TextField error={isError} helperText={helperText} fullWidth onChange={updateField} label="Solana address" variant="standard" sx={{ mb: 1 }} />
                        <LoadingButton
                            onClick={callFunction}
                            endIcon={<SendIcon />}
                            loading={isLoading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Send
                        </LoadingButton>
                        {success ? <Alert severity="success" sx={{mt: 2}}>Yaaas the transaction went through! meep 💖</Alert> : ""}

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
