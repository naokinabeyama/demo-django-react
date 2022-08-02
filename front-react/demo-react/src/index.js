import { StrictMode } from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';





const routing = (
    <StrictMode>
        <BrowserRouter>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </StrictMode>
)

ReactDom.render(
  routing, document.getElementById("root")
);
