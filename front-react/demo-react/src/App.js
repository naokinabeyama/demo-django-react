import './App.css';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Navbar from './components/Navbar';
import ApiContextProvider from './context/ApiContext';
import Main from './components/Main';
import Footer from './components/Footer';
import { Route, useLocation } from 'react-router-dom';
import ProfileList from "./components/ProfileList";
import Login from './components/Login';
import PostList from './components/PostList';




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
                <Route exact path='/' component={Login} />
                <Route exact path='/myprofile' component={Main} />
                <Route exact path='/profile/:id' component={Main} />
                <Route exact path='/profileList' component={ProfileList} />
                <Route exact path='/postList' component={PostList} />           
                <Footer />
            </MuiThemeProvider>
        </ApiContextProvider>
        
    );
}

export default App;
