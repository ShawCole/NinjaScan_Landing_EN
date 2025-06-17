import { useEffect, useState } from 'react';
import { calculateTimeUntilDeadline } from '@/utils/dateUtils';
import { useTranslation } from 'react-i18next';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { t } = useTranslation();

  // Responsive scaling logic
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Each timer box is min 120px, 4 boxes, 3 gaps (gap-8 = 2rem = 32px)
      const minBox = 120;
      const gap = 32;
      const totalWidth = 4 * minBox + 3 * gap;
      const minPadding = 30 * 2; // 30px on each side
      const windowWidth = window.innerWidth;
      const maxAllowed = windowWidth - minPadding;
      let newScale = 1;
      if (maxAllowed < totalWidth) {
        newScale = Math.max(0.6, maxAllowed / totalWidth); // Don't go below 60%
      }
      setScale(newScale);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilDeadline());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex gap-8 justify-center items-center"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center', transition: 'transform 0.2s' }}
    >
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-white/10 shadow-lg backdrop-blur-sm rounded-lg p-6 min-w-[120px] border border-gray-200/50 dark:border-white/10">
          <span className="text-6xl font-bold text-gray-900 dark:text-white">{timeLeft.days}</span>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">{t('hero.countdown.units.days')}</p>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-white/10 shadow-lg backdrop-blur-sm rounded-lg p-6 min-w-[120px] border border-gray-200/50 dark:border-white/10">
          <span className="text-6xl font-bold text-gray-900 dark:text-white">{timeLeft.hours}</span>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">{t('hero.countdown.units.hours')}</p>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-white/10 shadow-lg backdrop-blur-sm rounded-lg p-6 min-w-[120px] border border-gray-200/50 dark:border-white/10">
          <span className="text-6xl font-bold text-gray-900 dark:text-white">{timeLeft.minutes}</span>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">{t('hero.countdown.units.minutes')}</p>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-gray-100 dark:bg-white/10 shadow-lg backdrop-blur-sm rounded-lg p-6 min-w-[120px] border border-gray-200/50 dark:border-white/10">
          <span className="text-6xl font-bold text-gray-900 dark:text-white">{timeLeft.seconds}</span>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">{t('hero.countdown.units.seconds')}</p>
        </div>
      </div>
    </div>
  );
};
