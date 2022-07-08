import "../styles/globals.css";
import "../styles/custom.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/Layout";

const theme = extendTheme({
    brand: {
        100: "#ADE8F4",
        200: "#ADE8F4",
        300: "#ADE8F4",
        400: "#ADE8F4",
        500: "#023E8A",
        600: "#023E8A",
        700: "#023E8A",
        800: "#023E8A",
        900: "#023E8A"
    }
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </SessionProvider>
    );
}

function getBaseUrl() {
    if (process.browser) return ""; // Browser should use current path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
    config() {
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            url
        };
    },
    ssr: false
})(MyApp);
