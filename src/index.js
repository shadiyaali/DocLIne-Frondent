import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from "@material-tailwind/react";
import { SocketProvider } from "./components/SocketContext/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
