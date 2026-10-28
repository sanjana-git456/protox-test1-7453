import React from 'react';
import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import * as Icons from 'lucide-react';

const Challenges = () => {
  const { data: challenges, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => client.get('/recipes/challenges').then(res => res.data)
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Community Challenges</h1>
        <p className="text-slate-500">Hit your targets and earn badges for your profile.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {isLoading ? (
          <p>Loading challenges...</p>
        ) : (challenges ?? []).map(challenge => {
          const IconComponent = Icons[challenge.badge_icon] || Icons.Award;
          return (
            <div key={challenge.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6 items-start">
              <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                <IconComponent className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                <p className="text-slate-500 mb-6">{challenge.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span className="text-emerald-600 font-bold">0%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-0"></div>
                  </div>
                </div>

                <button className="w-full py-2 border-2 border-emerald-600 text-emerald-600 rounded-lg font-bold hover:bg-emerald-50 transition-colors">
                  Join Challenge
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;