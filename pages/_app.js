import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { CartContextProvider } from "@/components/CartContext.js";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #f0f0f0;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  hr{
    border-color: #eee;
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Helmet>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
        </style>
      </Helmet>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
