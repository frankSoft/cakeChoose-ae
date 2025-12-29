// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function CakeCard({
  cake,
  onSelect
}) {
  return <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square overflow-hidden bg-amber-50">
        {cake.image ? <img src={cake.image} alt={cake.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
            <div className="text-amber-300 text-6xl">🎂</div>
          </div>}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-2" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          {cake.name}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
            {cake.category}
          </span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
            {cake.size}
          </span>
          <span className="px-2 py-1 bg-rose-100 text-rose-800 text-xs rounded-full">
            {cake.flavor}
          </span>
        </div>
        
        {cake.description && <p className="text-amber-700 text-sm mb-4 line-clamp-2">
            {cake.description}
          </p>}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-900">
            ¥{cake.price}
          </span>
          <Button onClick={() => onSelect(cake)} className="bg-amber-600 hover:bg-amber-700 text-white">
            选择
          </Button>
        </div>
      </div>
    </div>;
}