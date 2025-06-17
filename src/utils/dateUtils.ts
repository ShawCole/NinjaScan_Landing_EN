export const DEADLINE_DATE = '2025-06-28';

export const calculateTimeUntilDeadline = () => {
    const deadline = new Date(DEADLINE_DATE).getTime();
    const now = new Date().getTime();
    const distance = deadline - now;

    return {
        days: Math.ceil(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
}; 