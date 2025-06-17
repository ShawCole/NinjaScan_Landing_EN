import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AccessibilityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        advisor: '',
        url: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-[150px] z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
        >
            <div className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl relative max-h-[calc(100vh-80px)] overflow-y-auto" role="document">
                <button
                    type="button"
                    className="absolute underline top-3 right-4 text-gray-500 hover:text-black text-xl"
                    onClick={onClose}
                    aria-label="Close dialog"
                >
                    ×
                </button>

                <h2 id="modalTitle" className="text-2xl font-bold mb-4 text-center text-[#624BFF]">
                    {t('accessibilityModal.title')}
                </h2>

                <p className="text-base text-gray-700 font-medium mb-6 text-center leading-relaxed bg-[#f5f4ff] rounded-md px-4 py-3 border border-[#d6d4ff] shadow-sm">
                    <span className="text-lg font-bold text-[#624BFF] block mb-1">{t('accessibilityModal.why')}</span>
                    <span dangerouslySetInnerHTML={{ __html: t('accessibilityModal.description') }} />
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold text-black">{t('accessibilityModal.name')}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:outline-2 focus:outline-[#00b894] focus:outline-offset-2 focus:bg-[#f0fdf4]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-semibold text-black">{t('accessibilityModal.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:outline-2 focus:outline-[#00b894] focus:outline-offset-2 focus:bg-[#f0fdf4]"
                        />
                    </div>
                    <div>
                        <label htmlFor="advisor" className="block font-semibold text-black">{t('accessibilityModal.advisor')}</label>
                        <input
                            type="text"
                            id="advisor"
                            name="advisor"
                            required
                            value={formData.advisor}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:outline-2 focus:outline-[#00b894] focus:outline-offset-2 focus:bg-[#f0fdf4]"
                        />
                    </div>
                    <div>
                        <label htmlFor="url" className="block font-semibold text-black">{t('accessibilityModal.urlLabel')}</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            required
                            placeholder={t('accessibilityModal.urlPlaceholder')}
                            value={formData.url}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:outline-2 focus:outline-[#00b894] focus:outline-offset-2 focus:bg-[#f0fdf4]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#624BFF] text-white w-full py-2 rounded hover:bg-white hover:text-black hover:border hover:border-[#624BFF] transition duration-200"
                    >
                        {t('accessibilityModal.submit')}
                    </button>
                </form>
            </div>
        </div>
    );
}; 