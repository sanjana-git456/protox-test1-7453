import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Zap, DollarSign, BarChart3 } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl">
          <Leaf className="w-8 h-8" />
          <span>NutriPlan Pro</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-emerald-600 font-medium">Log in</Link>
          <Link to="/register" className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors">Get Started</Link>
        </div>
      </header>
      
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6">
          Eat Better for You and <span className="text-emerald-600">The Planet</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Personalized meal planning that tracks your nutrition, budget, and carbon footprint. Smart pantry sync ensures you never waste a single ingredient.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">
            Start Your Free Plan
          </Link>
          <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50">
            Watch Demo
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-100">
          <Zap className="w-12 h-12 text-emerald-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Ingredient Swaps</h3>
          <p className="text-slate-600">Missing an ingredient? Our AI suggests the best eco-friendly and allergy-safe alternatives in real-time.</p>
        </div>
        <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100">
          <DollarSign className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Budget Optimized</h3>
          <p className="text-slate-600">We analyze local grocery prices to build meal plans that fit your weekly budget without sacrificing nutrition.</p>
        </div>
        <div className="p-8 rounded-2xl bg-amber-50 border border-amber-100">
          <BarChart3 className="w-12 h-12 text-amber-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Sustainability Scores</h3>
          <p className="text-slate-600">Track your carbon and water footprint with every meal. Earn badges for hitting eco-friendly targets.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;