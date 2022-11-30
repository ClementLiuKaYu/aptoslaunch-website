import type { AppProps } from "next/app";
import store from "../app/redux/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import theme from "../styles/theme";
import Layout from "../components/layouts/main";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout router={router}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
