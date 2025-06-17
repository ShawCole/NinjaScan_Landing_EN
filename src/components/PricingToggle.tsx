import { useTranslation } from 'react-i18next';

interface PricingToggleProps {
    isYearly: boolean;
    onToggle: (isYearly: boolean) => void;
}

export const PricingToggle = ({ isYearly, onToggle }: PricingToggleProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center w-[300px]">
                <div className="w-[100px] text-right">
                    <span className={`text-lg font-medium ${!isYearly ? 'text-gray-900 : 'text-gray-500 dark:text-gray-400'}`}>
                        {t('pricing.toggle.monthly')}
                    </span>
                </div>
                <button
                    onClick={() => onToggle(!isYearly)}
                    className="relative w-16 h-8 rounded-full bg-[#4A3AFF] cursor-pointer mx-4"
                    role="switch"
                    aria-checked={isYearly}
                >
                    <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out ${isYearly ? 'translate-x-8' : 'translate-x-0'
                            }`}
                    />
                </button>
                <div className="w-[100px] flex items-center">
                    <span className={`text-lg font-medium ${isYearly ? 'text-gray-900 : 'text-gray-500 dark:text-gray-400'}`}>
                        {t('pricing.toggle.yearly')}
                    </span>
                    <span className="text-sm text-green-400 font-medium ml-2">{t('pricing.toggle.discount')}</span>
                </div>
            </div>
        </div>
    );
}; 