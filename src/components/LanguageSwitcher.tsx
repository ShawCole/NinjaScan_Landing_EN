import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

const languages = {
    en: { name: 'English', flag: '🇬🇧' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    it: { name: 'Italiano', flag: '🇮🇹' }
};

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="fixed bottom-16 right-4 z-50 rounded-full bg-white/10 backdrop-blur-sm dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 transition-colors"
                >
                    <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                    <DropdownMenuItem
                        key={code}
                        onClick={() => i18n.changeLanguage(code)}
                        className={`cursor-pointer ${i18n.language === code ? 'bg-accent' : ''}`}
                    >
                        <span className="mr-2">{flag}</span>
                        {name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 