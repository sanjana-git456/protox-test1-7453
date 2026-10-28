import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { Search, Filter, Leaf, Wind, DollarSign } from 'lucide-react';

const Recipes = () => {
  const [search, setSearch] = useState('');
  
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => client.get('/recipes').then(res => res.data)
  });

  const filteredRecipes = (recipes ?? []).filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recipe Library</h1>
          <p className="text-slate-500">Discover eco-friendly and nutritious meals.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <p>Loading recipes...</p>
        ) : filteredRecipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
            <div className="h-48 bg-slate-200 relative">
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-emerald-700">
                <Leaf className="w-3 h-3" /> {recipe.carbon_score} Carbon
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{recipe.title}</h3>
                <span className="text-emerald-600 font-bold">${recipe.cost_estimate.toFixed(2)}</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 line-clamp-3">{recipe.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Protein</p>
                  <p className="font-bold text-sm">{recipe.protein}g</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Carbs</p>
                  <p className="font-bold text-sm">{recipe.carbs}g</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Fats</p>
                  <p className="font-bold text-sm">{recipe.fats}g</p>
                </div>
              </div>

              <button className="mt-auto w-full bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;