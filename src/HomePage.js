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

function callFunction() {
    const functions = getFunctions();
    connectFunctionsEmulator(functions, "localhost", 5001);
    const sendSolanaTransaction = httpsCallable(functions, 'sendSolanaTransaction');
    sendSolanaTransaction()
      .then((result) => {

      });
}

export default function HomePage() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SOL Sender
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={2} justifyContent={"center"} p={5}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Enter your Solana address to receive 0.01 SOL
                        </Typography>
                        <TextField fullWidth label="Solana address" variant="standard" sx={{ mb: 1 }} />
                        <LoadingButton
                            onClick={callFunction}
                            endIcon={<SendIcon />}
                            loading={false}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Send
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
