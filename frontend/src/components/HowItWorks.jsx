import React from 'react';
import { FeatureCard } from './FeatureCard';

export const HowItWorks = () => {
  const features = [
    {
      icon: "/dart.png",
      title: "Company-Specific Insights",
      description: "Understand what different companies look for by seeing rejection patterns and feedback from Google, Apple, Netflix, and more.",
      iconBg: "bg-[rgba(102,126,234,1)]"
    },
    {
      icon: "/compass.png",
      title: "Understand What Not To Do",
      description: "Gain a unique advantage by learning directly from what doesn't work. Provide clear indicators of common missteps.",
      iconBg: "bg-[rgba(102,126,234,1)]"
    },
    {
      icon: "/graph.png",
      title: "Learn From Real Rejections",
      description: "Browse real portfolios that were rejected by top companies and understand exactly what went wrong and how to fix it.",
      iconBg: "bg-[rgba(102,126,234,1)]"
    }
  ];

  return (
    <section id="how-it-works" className="flex flex-col items-center">
      <h2 className="text-black text-[40px] font-normal mt-[49px] max-md:mt-10">
        How it work
      </h2>
      <p className="text-black text-xl font-normal mt-[103px] max-md:mt-10">
        Learn from others today
      </p>
      <div className="w-full max-w-[1304px] mt-[95px] max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {features.map((feature, index) => (
            <div key={index} className="w-[33%] max-md:w-full max-md:ml-0">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconBg={feature.iconBg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
