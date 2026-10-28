import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { Plus, Trash2, Search, Package } from 'lucide-react';

const Pantry = () => {
  const queryClient = useQueryClient();
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, unit: 'pcs' });

  const { data: items, isLoading } = useQuery({
    queryKey: ['pantry'],
    queryFn: () => client.get('/pantry').then(res => res.data)
  });

  const addMutation = useMutation({
    mutationFn: (item) => client.post('/pantry', item),
    onSuccess: () => {
      queryClient.invalidateQueries(['pantry']);
      setNewItem({ name: '', quantity: 1, unit: 'pcs' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => client.delete(`/pantry/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['pantry'])
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pantry Inventory</h1>
          <p className="text-slate-500">Manage your ingredients and track expiry dates.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700">
          <Search className="w-4 h-4" /> Scan Barcode
        </button>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold mb-4">Add New Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Item name (e.g. Eggs)"
            className="md:col-span-2 p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Qty"
            className="p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
          />
          <button
            onClick={() => addMutation.mutate(newItem)}
            disabled={!newItem.name}
            className="bg-emerald-600 text-white p-3 rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50"
          >
            <Plus className="w-5 h-5 mx-auto" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-bottom border-slate-100">
            <tr>
              <th className="px-6 py-4 font-bold text-sm text-slate-600">Item</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-600">Quantity</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan="3" className="p-6 text-center text-slate-500">Loading...</td></tr>
            ) : (items ?? []).length === 0 ? (
              <tr><td colSpan="3" className="p-10 text-center text-slate-500">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-20" />
                Your pantry is empty.
              </td></tr>
            ) : (
              items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteMutation.mutate(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pantry;