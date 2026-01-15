import React from 'react';
import { Calendar, Zap, BarChart3 } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-24 bg-planova-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-planova-dark">Built for Student Success</h2>
          <p className="text-gray-500 mt-4">Everything you need to stay organized without the overwhelm.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Calendar className="text-planova-mint" />}
            title="Next-Day Planning"
            desc="Plan tomorrow tonight. Wake up knowing exactly what needs to be done."
          />
          <FeatureCard 
            icon={<Zap className="text-planova-mint" />}
            title="Automatic Carry-Forward"
            desc="Missed a task? No panic. We automatically move it to your next available slot."
          />
          <FeatureCard 
            icon={<BarChart3 className="text-planova-mint" />}
            title="Streak Tracking"
            desc="Build consistency. Visualize your progress with satisfying streaks."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-planova-soft rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-planova-dark mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// THIS IS THE MISSING LINE CAUSING YOUR ERROR
export default Features;