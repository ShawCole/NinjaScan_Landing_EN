export const PRICING = {
    pro: {
        monthly: {
            actual: 49,
            mock: 69
        },
        annual: {
            actual: 490,
            mock: 699
        }
    },
    proPlus: {
        monthly: {
            actual: 99,
            mock: 169
        },
        annual: {
            actual: 990,
            mock: 1699
        }
    },
    ultimate: {
        monthly: {
            actual: 199,
            mock: 359
        },
        annual: {
            actual: 1990,
            mock: 3599
        }
    }
} as const;

export const formatPrice = (amount: number): string => {
    return `€${amount}`;
};

export const getPrice = (plan: keyof typeof PRICING, isYearly: boolean, isMock: boolean = false): string => {
    const pricing = PRICING[plan];
    const period = isYearly ? 'annual' : 'monthly';
    const type = isMock ? 'mock' : 'actual';
    return formatPrice(pricing[period][type]);
}; 