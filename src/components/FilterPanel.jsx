// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Filter, X } from 'lucide-react';

export function FilterPanel({
  filters,
  onFilterChange,
  cakes
}) {
  const categories = [...new Set(cakes.map(cake => cake.category).filter(Boolean))];
  const sizes = [...new Set(cakes.map(cake => cake.size).filter(Boolean))];
  const flavors = [...new Set(cakes.map(cake => cake.flavor).filter(Boolean))];
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };
  const clearFilters = () => {
    onFilterChange({
      category: '',
      size: '',
      flavor: ''
    });
  };
  const hasActiveFilters = filters.category || filters.size || filters.flavor;
  return <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          筛选条件
        </h2>
        {hasActiveFilters && <Button variant="ghost" size="sm" onClick={clearFilters} className="text-amber-700 hover:text-amber-900">
            <X className="w-4 h-4" />
          </Button>}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-3">
            蛋糕分类
          </label>
          <Select value={filters.category || 'all'} onValueChange={value => handleFilterChange('category', value === 'all' ? '' : value)}>
            <SelectTrigger className="border-amber-200 focus:border-amber-500">
              <SelectValue placeholder="全部分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              {categories.map(category => <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-900 mb-3">
            蛋糕尺寸
          </label>
          <Select value={filters.size || 'all'} onValueChange={value => handleFilterChange('size', value === 'all' ? '' : value)}>
            <SelectTrigger className="border-amber-200 focus:border-amber-500">
              <SelectValue placeholder="全部尺寸" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部尺寸</SelectItem>
              {sizes.map(size => <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-900 mb-3">
            蛋糕口味
          </label>
          <Select value={filters.flavor || 'all'} onValueChange={value => handleFilterChange('flavor', value === 'all' ? '' : value)}>
            <SelectTrigger className="border-amber-200 focus:border-amber-500">
              <SelectValue placeholder="全部口味" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部口味</SelectItem>
              {flavors.map(flavor => <SelectItem key={flavor} value={flavor}>
                  {flavor}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && <div className="pt-4 border-t border-amber-100">
            <div className="space-y-2">
              {filters.category && <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">分类: {filters.category}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleFilterChange('category', '')} className="text-amber-600 hover:text-amber-800 h-6 px-2">
                    <X className="w-3 h-3" />
                  </Button>
                </div>}
              {filters.size && <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">尺寸: {filters.size}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleFilterChange('size', '')} className="text-amber-600 hover:text-amber-800 h-6 px-2">
                    <X className="w-3 h-3" />
                  </Button>
                </div>}
              {filters.flavor && <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">口味: {filters.flavor}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleFilterChange('flavor', '')} className="text-amber-600 hover:text-amber-800 h-6 px-2">
                    <X className="w-3 h-3" />
                  </Button>
                </div>}
            </div>
          </div>}
      </div>
    </div>;
}