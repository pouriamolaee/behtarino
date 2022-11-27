import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto_Condensed } from "@next/font/google";
import "@styles/globals.css";
import theme from "@styles/theme";

const robotoCondensed = Roboto_Condensed({ weight: ["300", "400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className={robotoCondensed.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
