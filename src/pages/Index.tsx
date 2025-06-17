import { Button } from "@/components/ui/button";
import { AccessibilityModal } from "@/components/AccessibilityModal";
import { ConsequenceCard } from "@/components/ConsequenceCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TriangleAlert, Timer, Users, Info, Clock, CheckCircle, Search, CircleCheckBig } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PricingToggle } from "@/components/PricingToggle";
import { calculateTimeUntilDeadline, DEADLINE_DATE } from "@/utils/dateUtils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getPrice } from "@/constants/pricing";

const Index = () => {
  const timeUntilDeadline = calculateTimeUntilDeadline();
  const { t, i18n } = useTranslation();
  const [isYearly, setIsYearly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isGerman = i18n.language === 'de';

  // Force yearly pricing for German language
  useEffect(() => {
    if (isGerman) {
      setIsYearly(true);
    }
  }, [isGerman]);

  const renderPricing = (plan: 'pro' | 'proPlus' | 'ultimate') => {
    const actualPrice = getPrice(plan, isYearly);
    const mockPrice = getPrice(plan, isYearly, true);
    const periodKey = isYearly ? 'year' : 'month';

    return (
      <div className="w-max mx-auto text-center space-y-1">
        <p className="text-2xl text-gray-500 text-center">
          <span className="line-through">{mockPrice}</span>
          <span className="text-base">{" "}{t(`pricing.period.${periodKey}`)}</span>
        </p>
        <p className="text-3xl font-bold text-[#624BFF]">
          {actualPrice}
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">{" "}{t(`pricing.period.${periodKey}`)}</span>
        </p>
      </div>
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#1A1F2C] dark:to-[#2C3E50] text-gray-900 dark:text-white">
    {/* Sticky Warning Banner */}
    <div className="bg-red-500 text-white py-3 px-6 text-center sticky top-0 z-50">
      <p className="text-base md:text-lg font-semibold">{t('banner.warning')}</p>
    </div>

    {/* Hero Section */}
    <section className="relative py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-playfair mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={openModal}
            className="bg-green-500 hover:bg-green-600 text-white px-12 py-8 text-2xl rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold relative"
          >
            <span className="absolute left-7 text-xl">🔎</span>
            <span className="ml-4">{t('hero.cta').replace('🔎 ', '')}</span>
          </Button>
        </div>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">{t('hero.disclaimer')}</p>

        <div className="mt-16">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">{t('hero.countdown.title')}</h3>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>

    {/* Consequences Section */}
    <section className="py-12 px-4 bg-gray-50 dark:bg-black/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-playfair mb-12 text-center text-gray-900 dark:text-white">
          {t('consequences.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ConsequenceCard
            icon={<TriangleAlert />}
            title={t('consequences.cards.fines.title')}
            description={t('consequences.cards.fines.description')}
          />
          <ConsequenceCard
            icon={<Timer />}
            title={t('consequences.cards.shutdown.title')}
            description={t('consequences.cards.shutdown.description')}
          />
          <ConsequenceCard
            icon={<Users />}
            title={t('consequences.cards.revenue.title')}
            description={t('consequences.cards.revenue.description')}
          />
          <ConsequenceCard
            icon={<Info />}
            title={t('consequences.cards.legal.title')}
            description={t('consequences.cards.legal.description')}
          />
        </div>
      </div>
    </section>

    {/* Urgency Section */}
    <section className="py-12 px-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-gray-900 dark:text-white">
          {t('urgency.title', { days: timeUntilDeadline.days, deadline: 'June 28th' })}
        </h2>
        <p className="text-xl mb-8 text-gray-800 dark:text-gray-200 max-w-3xl mx-auto font-medium">
          {t('urgency.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            onClick={openModal}
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-8 text-2xl rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold relative"
          >
            <span className="absolute left-7 text-xl">🚨</span>
            <span className="ml-4">{t('urgency.cta').replace('🚨 ', '')}</span>
          </Button>
        </div>
      </div>
    </section>

    {/* Solution Section */}
    <section className="pt-12 pb-6 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-green-600/20 dark:to-blue-600/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-8 sm:mb-12 text-center text-gray-900 dark:text-white">
          {t('solution.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('solution.features.audit.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('solution.features.audit.description')}</p>
          </div>
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('solution.features.fixes.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('solution.features.fixes.description')}</p>
          </div>
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('solution.features.guidance.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('solution.features.guidance.description')}</p>
          </div>
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('solution.features.affordable.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('solution.features.affordable.description')}</p>
          </div>
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('solution.features.roi.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('solution.features.roi.description')}</p>
          </div>
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('solution.features.free.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('solution.features.free.description')}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            onClick={openModal}
            className="bg-green-500 hover:bg-green-600 text-white px-12 py-8 text-2xl rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold relative"
          >
            <span className="absolute left-7 text-xl">🔎</span>
            <span className="ml-4">{t('closingCta.cta').replace('🔎 ', '')}</span>
          </Button>
        </div>
      </div>
    </section>

    {/* Timeline Section */}
    <section className="py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-6 sm:mb-8 text-gray-900 dark:text-white max-w-4xl mx-auto">
          {t('timeline.title')}
        </h2>
        <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-red-700 dark:text-red-400 font-semibold">
          {t('timeline.subtitle')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-[#202935] rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-[#2C3E50]/50 shadow-lg hover:shadow-xl">
            <Clock className="mx-auto text-blue-700 dark:text-blue-400 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('timeline.steps.audit.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('timeline.steps.audit.description')}</p>
          </div>
          <div className="bg-white dark:bg-[#202935] rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-[#2C3E50]/50 shadow-lg hover:shadow-xl">
            <CircleCheckBig className="mx-auto text-green-700 dark:text-green-400 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('timeline.steps.remediation.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('timeline.steps.remediation.description')}</p>
          </div>
          <div className="bg-white dark:bg-[#202935] rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-[#2C3E50]/50 shadow-lg hover:shadow-xl">
            <Search className="mx-auto text-purple-700 dark:text-purple-400 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('timeline.steps.testing.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('timeline.steps.testing.description')}</p>
          </div>
          <div className="bg-white dark:bg-[#202935] rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-[#2C3E50]/50 shadow-lg hover:shadow-xl">
            <Info className="mx-auto text-amber-700 dark:text-yellow-400 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('timeline.steps.documentation.title')}</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{t('timeline.steps.documentation.description')}</p>
          </div>
        </div>
        <p className="mt-8 sm:mt-12 text-base sm:text-xl text-gray-700 dark:text-gray-400/80 font-medium">
          {t('timeline.conclusion')}
        </p>
      </div>
    </section>

    {/* Pricing Section */}
    <section role="region" id="license" aria-labelledby="pricing-heading" className="py-12 px-4 md:px-12 lg:px-12 xl:px-24 bg-white/50 dark:bg-[#1A1F2C]">
      <div className="text-center pb-10">
        <h2 id="pricing-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('pricing.title')}</h2>
        <hr className="border border-[#624BFF] w-60 mx-auto mb-4" />
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center w-[300px]">
            <div className="w-[100px] text-right">
              <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{t('pricing.toggle.monthly')}</span>
            </div>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-[#4A3AFF] cursor-pointer mx-4"
              role="switch"
              aria-checked={isYearly}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </button>
            <div className="w-[100px] flex items-center">
              <span className="text-lg font-medium text-gray-900 dark:text-white">{t('pricing.toggle.yearly')}</span>
              <span className="text-sm text-green-400 font-medium ml-2">{t('pricing.toggle.discount')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Pro */}
        <div className="bg-white dark:bg-[#202935] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col hover:border-[#624BFF]">
          <div className="flex flex-col items-center text-center flex-grow">
            <div className="flex flex-col items-center justify-end min-h-[120px] w-full">
              <i className="fa-solid fa-rocket text-3xl text-[#624BFF] mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.plans.pro.name')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('pricing.plans.pro.description')}</p>
            </div>
            <div className="w-max mx-auto text-center space-y-1">
              {renderPricing('pro')}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('pricing.plans.pro.limit')}</p>
          </div>
          <div className="mt-8 flex justify-center">
            <a href="/src/login/signup.html" className="bg-[#624BFF] text-white px-4 py-2 rounded-md font-semibold shadow-md transition duration-200 hover:bg-[#7E6BFF] hover:text-white focus:outline focus:outline-2 focus:outline-[#624BFF]">
              {t('pricing.plans.pro.cta')}
            </a>
          </div>
          <ul className="text-sm mt-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>{t('pricing.features.report')}</li>
            <li>{t('pricing.features.widget')}</li>
            <li>{t('pricing.features.generator')}</li>
            <li>{t('pricing.features.compliance')}</li>
            <li>{t('pricing.features.eco')}</li>
          </ul>
        </div>

        {/* Pro Plus */}
        <div className="bg-white dark:bg-[#202935] p-6 rounded-lg shadow-xl border-2 border-[#624BFF] flex flex-col relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#624BFF] text-white px-6 py-1 rounded-full text-sm whitespace-nowrap">
            {t('pricing.plans.proPlus.tag')}
          </div>
          <div className="flex flex-col items-center text-center flex-grow">
            <div className="flex flex-col items-center justify-end min-h-[120px] w-full">
              <i className="fa-solid fa-shuttle-space text-3xl text-[#624BFF] mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.plans.proPlus.name')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('pricing.plans.proPlus.description')}</p>
            </div>
            <div className="w-max mx-auto text-center space-y-1">
              {renderPricing('proPlus')}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('pricing.plans.proPlus.limit')}</p>
          </div>
          <div className="mt-8 flex justify-center">
            <a href="/src/login/signup.html" className="bg-[#624BFF] text-white px-4 py-2 rounded-md font-semibold shadow-md transition duration-200 hover:bg-[#7E6BFF] hover:text-white focus:outline focus:outline-2 focus:outline-[#624BFF]">
              {t('pricing.plans.proPlus.cta')}
            </a>
          </div>
          <ul className="text-sm mt-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>{t('pricing.features.report')}</li>
            <li>{t('pricing.features.widget')}</li>
            <li>{t('pricing.features.generator')}</li>
            <li>{t('pricing.features.compliance')}</li>
            <li>{t('pricing.features.eco')}</li>
          </ul>
        </div>

        {/* Ultimate */}
        <div className="bg-white dark:bg-[#202935] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col hover:border-[#624BFF]">
          <div className="flex flex-col items-center text-center flex-grow">
            <div className="flex flex-col items-center justify-end min-h-[120px] w-full">
              <i className="fa-solid fa-shuttle-space text-3xl text-[#624BFF] mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.plans.ultimate.name')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('pricing.plans.ultimate.description')}</p>
            </div>
            <div className="w-max mx-auto text-center space-y-1">
              {renderPricing('ultimate')}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('pricing.plans.ultimate.limit')}</p>
          </div>
          <div className="mt-8 flex justify-center">
            <a href="/src/login/signup.html" className="bg-[#624BFF] text-white px-4 py-2 rounded-md font-semibold shadow-md transition duration-200 hover:bg-[#7E6BFF] hover:text-white focus:outline focus:outline-2 focus:outline-[#624BFF]">
              {t('pricing.plans.ultimate.cta')}
            </a>
          </div>
          <ul className="text-sm mt-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>{t('pricing.features.report')}</li>
            <li>{t('pricing.features.widget')}</li>
            <li>{t('pricing.features.generator')}</li>
            <li>{t('pricing.features.compliance')}</li>
            <li>{t('pricing.features.eco')}</li>
          </ul>
        </div>

        {/* Enterprise */}
        <div className="bg-white dark:bg-[#202935] p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col hover:border-[#624BFF]">
          <div className="flex flex-col items-center text-center flex-grow">
            <div className="flex flex-col items-center justify-end min-h-[120px] w-full">
              <i className="fa-solid fa-satellite-dish text-3xl text-[#624BFF] mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.plans.enterprise.name')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('pricing.plans.enterprise.description')}</p>
            </div>
            <div className="mt-8">
              <p className="text-2xl font-bold text-[#624BFF]">{t('pricing.plans.enterprise.price')}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('pricing.plans.enterprise.limit')}</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <a href="#" className="bg-[#624BFF] text-white px-4 py-2 rounded-md font-semibold shadow-md transition duration-200 hover:bg-[#7E6BFF] hover:text-white focus:outline focus:outline-2 focus:outline-[#624BFF]">
              {t('pricing.plans.enterprise.cta')}
            </a>
          </div>
          <ul className="text-sm mt-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>{t('pricing.features.report')}</li>
            <li>{t('pricing.features.widget')}</li>
            <li>{t('pricing.features.generator')}</li>
            <li>{t('pricing.features.compliance')}</li>
            <li>{t('pricing.features.eco')}</li>
          </ul>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="py-12 px-4 sm:px-6 md:px-8 bg-gray-100/50 dark:bg-black/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-8 sm:mb-12 text-center text-gray-900 dark:text-white">{t('faq.title')}</h2>
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white/80 dark:bg-[#202935] backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('faq.questions.ignore.question')}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t('faq.questions.ignore.answer')}</p>
          </div>
          <div className="bg-white/80 dark:bg-[#202935] backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('faq.questions.howItWorks.question')}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t('faq.questions.howItWorks.answer')}</p>
          </div>
          <div className="bg-white/80 dark:bg-[#202935] backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('faq.questions.compliance.question')}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t('faq.questions.compliance.answer')}</p>
          </div>
        </div>
      </div>
    </section>

    {/* Closing CTA Section */}
    <section className="py-12 px-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-600/20 dark:to-blue-600/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-playfair mb-6 text-gray-900 dark:text-white">
          {t('closingCta.title')}
        </h2>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          {t('closingCta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            onClick={openModal}
            className="bg-green-500 hover:bg-green-600 text-white px-12 py-8 text-2xl rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold relative"
          >
            <span className="absolute left-7 text-xl">🔎</span>
            <span className="ml-4">{t('hero.cta').replace('🔎 ', '')}</span>
          </Button>
        </div>
      </div>
    </section>

    <ThemeToggle />
    <LanguageSwitcher />

    {/* Accessibility Modal */}
    <AccessibilityModal isOpen={isModalOpen} onClose={closeModal} />

    {/* Footer */}
    <footer role="contentinfo" className="bg-[#212b36] p-8 text-white">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        {/* Logo & Info - Left on desktop, below nav on mobile */}
        <div className="order-2 lg:order-1 text-center lg:text-left lg:flex-shrink-0">
          <h2 className="text-lg flex gap-1 justify-center lg:justify-start items-center font-bold">
            <img src="/email/img/logo/NinjaScan_Logo_White_2.svg" alt="NinjaSCAN.ai logo" className="w-36 h-auto" />
          </h2>
          <p className="text-xs text-gray-400 mt-2">
            <span className="font-bold">NinjaSCAN.ai</span><br />
            <span>By PixelFree Studio</span><br />
            <span>Kaiserstraße 26A</span><br />
            <span>66111 Saarbrücken</span><br />
            <span>Germany</span><br />
            <span>info@pixelfreestudio.com</span><br />
            <span>© All Rights Reserved</span>
          </p>
        </div>

        {/* Footer Navigation - Top on mobile, right on desktop */}
        <nav aria-label="Footer Navigation" className="order-1 lg:order-2 lg:flex-grow lg:flex lg:justify-end">
          <ul className="flex flex-wrap justify-center lg:justify-end items-center text-gray-400 text-sm gap-3 lg:gap-4" role="list">
            <li><a href="/" aria-label="Go to Home" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">Home</a></li>
            <li><a href="/AccessibilityStatement.html" aria-label="Go to the Accessibility Statement" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">Accessibility Statement</a></li>
            <li><a href="/support.html" aria-label="Go to Support" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">Support</a></li>
            <li><a href="/privacy-policy.html" aria-label="View Privacy Policy" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">Privacy Policy</a></li>
            <li><a href="/gdpr-privacy-policy.html" aria-label="View GDPR Privacy Policy" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">GDPR Privacy Policy</a></li>
            <li><a href="/refund.html" aria-label="View Refund Policy" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">Refund Policy</a></li>
            <li><a href="/terms.html" aria-label="View Terms of Service" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">Terms of Service</a></li>
            <li><a href="/cookie-policy.html" aria-label="View Cookie Policy" className="underline hover:text-white focus:!text-white focus:outline-none focus:ring-2 focus:ring-[#624BFF] focus:ring-offset-2 transition-colors whitespace-nowrap">Cookie Policy</a></li>
          </ul>
        </nav>
      </div>

      {/* Social + CTA Button */}
      <div className="py-5 flex flex-col lg:flex-row flex-wrap items-center gap-6 justify-center w-full">
      </div>
    </footer>
  </div>;
};

export default Index;