import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./config/App-Router.tsx";
import { ThemeConfig } from "./config/chakra-theme.ts";
import "./assets/css/fonts.css";
import "./assets/css/scrollbar.css";
import "./assets/css/global.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./stores/stores.ts";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={ThemeConfig}>
        <AppRouter></AppRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
