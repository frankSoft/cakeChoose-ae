// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { CakeCard } from '@/components/CakeCard';
import { FilterPanel } from '@/components/FilterPanel';
export default function Home(props) {
  const {
    toast
  } = useToast();
  const [cakes, setCakes] = useState([]);
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    flavor: ''
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadCakes();
  }, []);
  useEffect(() => {
    applyFilters();
  }, [cakes, filters]);
  const loadCakes = async () => {
    try {
      setLoading(true);
      const result = await props.$w.cloud.callFunction({
        name: 'getCakes',
        data: {}
      });
      if (result.success) {
        setCakes(result.data || []);
      } else {
        toast({
          title: "加载失败",
          description: result.message || "无法加载蛋糕信息",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('加载蛋糕失败:', error);
      toast({
        title: "加载失败",
        description: "网络错误，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const applyFilters = () => {
    let filtered = cakes;
    if (filters.category) {
      filtered = filtered.filter(cake => cake.category === filters.category);
    }
    if (filters.size) {
      filtered = filtered.filter(cake => cake.size === filters.size);
    }
    if (filters.flavor) {
      filtered = filtered.filter(cake => cake.flavor === filters.flavor);
    }
    setFilteredCakes(filtered);
  };
  const handleFilterChange = newFilters => {
    setFilters(newFilters);
  };
  const handleCakeSelect = cake => {
    toast({
      title: "已选择",
      description: `您已选择 ${cake.name}`
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            西子烘培
          </h1>
          <p className="text-xl text-amber-700">精选蛋糕，甜美时光</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} cakes={cakes} />
          </div>
          
          <div className="lg:col-span-3">
            {loading ? <div className="flex justify-center items-center h-64">
                <div className="text-amber-700">加载中...</div>
              </div> : filteredCakes.length === 0 ? <div className="text-center py-12">
                <p className="text-amber-700 text-lg">没有找到符合条件的蛋糕</p>
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCakes.map(cake => <CakeCard key={cake.id} cake={cake} onSelect={handleCakeSelect} />)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
}