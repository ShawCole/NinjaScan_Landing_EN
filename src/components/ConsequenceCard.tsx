import { ReactNode } from 'react';

interface ConsequenceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const ConsequenceCard = ({ icon, title, description }: ConsequenceCardProps) => {
  return (
    <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:transform hover:scale-105 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md [transition:transform_300ms,box-shadow_300ms]">
      <div className="text-red-600 dark:text-red-500 mb-4 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};
