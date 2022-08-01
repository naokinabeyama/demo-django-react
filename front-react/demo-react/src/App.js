import './App.css';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Navbar from './components/Navbar';
import ApiContextProvider from './context/ApiContext';
import Main from './components/Main';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import ProfileList from "./components/ProfileList";
import AllRouter from './router/AllRouter';



const theme = createTheme({
    palette: {
        primary: grey,
        secondary: {
          main: '#11cb5f',
        },
    },
    typography: {
        fontFamily:'Courier New',
    }
});

function App() {
    return (
        <ApiContextProvider>
            <MuiThemeProvider theme={theme}>
                <Navbar />
                <Switch>
                    {/* <AllRouter /> */}
                    {/* <Route exact path='/profile' component={ProfileList} /> */}
                </Switch>
                <Footer />
            </MuiThemeProvider>
        </ApiContextProvider>
    );
}

export default App;
