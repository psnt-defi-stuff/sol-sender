import HomePage from './HomePage'
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAglIB1GZjmpmUgFpYpZwLszTlE-A5-UwY",
  authDomain: "sol-sender.firebaseapp.com",
  projectId: "sol-sender",
  storageBucket: "sol-sender.appspot.com",
  messagingSenderId: "839946685769",
  appId: "1:839946685769:web:3bbc7e66926ee2f7551e98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const theme = createTheme({
  palette: {
    primary: {
      main: "#db04db"
    },
  },
});


function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
