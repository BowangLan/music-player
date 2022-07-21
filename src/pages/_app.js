import { GlobalContextWrapper } from "../context";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextWrapper>
  );
}

export default MyApp;
