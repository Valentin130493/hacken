import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";

import "antd/dist/reset.css";


const rootElement = document.querySelector("#root") as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
