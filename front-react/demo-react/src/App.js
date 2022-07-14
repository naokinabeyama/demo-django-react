import { createTheme} from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';


const theme = createTheme({
    palette: {
        primary: grey[300],
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
    </MuiThemeProvider>
  );
}

export default App;
