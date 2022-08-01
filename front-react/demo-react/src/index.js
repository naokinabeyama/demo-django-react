import { StrictMode } from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import {CookiesProvider} from 'react-cookie';
import ProfileList from "./components/ProfileList";


const routing = (
  <StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Route exact path='/' component={Login} />
        <Route exact path='/myprofile' component={App} />
        <Route exact path='/profile' component={ProfileList} />
      </CookiesProvider>
    </BrowserRouter>
  </StrictMode>
)

ReactDom.render(
  routing, document.getElementById("root")
);
