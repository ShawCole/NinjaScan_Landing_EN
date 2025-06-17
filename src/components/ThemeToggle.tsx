import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Only run on client side
    useEffect(() => {
        setMounted(true);
        // Log initial state
        console.log("ThemeToggle mounted");
        console.log("Initial theme state:", {
            theme,
            mounted: true,
            systemTheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        });
    }, []);

    // Log theme changes
    useEffect(() => {
        if (mounted) {
            console.log("Theme state updated:", {
                theme,
                systemTheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            });
        }
    }, [theme, mounted]);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        const isCurrentlyDark =
            theme === "dark" ||
            (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

        const newTheme = isCurrentlyDark ? "light" : "dark";
        console.log("Toggling theme:", {
            currentTheme: theme,
            newTheme
        });
        setTheme(newTheme);
    };

    const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 right-4 z-50 rounded-full bg-white/10 backdrop-blur-sm dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <Sun className={`h-5 w-5 transition-all ${isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <Moon className={`absolute h-5 w-5 transition-all ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
} 