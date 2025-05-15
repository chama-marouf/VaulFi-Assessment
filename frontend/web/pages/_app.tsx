import type { AppProps } from "next/app"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
    },
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className={inter.className}>
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
    )
}
