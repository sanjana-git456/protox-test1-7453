import React from 'react';
import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, ShoppingCart, Activity, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: pantry } = useQuery({
    queryKey: ['pantry'],
    queryFn: () => client.get('/pantry').then(res => res.data)
  });

  const { data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => client.get('/recipes').then(res => res.data)
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.username}!</h1>
        <p className="text-slate-500">Here's your nutritional summary for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600">+12% vs last week</span>
          </div>
          <p className="text-slate-500 text-sm">Daily Calories</p>
          <h3 className="text-2xl font-bold">1,840 kcal</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Pantry Items</p>
          <h3 className="text-2xl font-bold">{pantry?.length || 0} items</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Carbon Score</p>
          <h3 className="text-2xl font-bold">14.2 kg CO₂</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Active Challenges</p>
          <h3 className="text-2xl font-bold">2 active</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Recommended for You</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(recipes ?? []).map(recipe => (
              <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
                <div className="h-40 bg-slate-200 relative">
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                    {recipe.carbon_score} kg CO₂
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1">{recipe.title}</h4>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">{recipe.calories} kcal</span>
                    <button className="text-emerald-600 font-bold text-sm hover:underline">View Recipe</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold">Expiring Soon</h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            {(pantry ?? []).length === 0 ? (
              <p className="text-slate-500 text-sm italic">Your pantry is empty.</p>
            ) : (
              pantry.slice(0, 3).map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-red-500">Expires in 2 days</p>
                  </div>
                  <span className="text-sm text-slate-500">{item.quantity} {item.unit}</span>
                </div>
              ))
            )}
            <button className="w-full py-2 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
              View All Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;