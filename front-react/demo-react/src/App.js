import './App.css';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Navbar from './components/Navbar';


const theme = createTheme({
    palette: {
        primary: grey,
        secondary: {
          main: '#11cb5f',
        },
    },
    typography: {
        fontFamily:'Comic Neue',
    }
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Navbar />
        </MuiThemeProvider>
    );
}

export default App;
