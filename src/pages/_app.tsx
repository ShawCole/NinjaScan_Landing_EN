import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            storageKey="theme"
        >
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default App; 