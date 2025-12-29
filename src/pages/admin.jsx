// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Admin(props) {
  const {
    toast
  } = useToast();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    size: '',
    flavor: '',
    price: '',
    description: '',
    image: ''
  });
  useEffect(() => {
    loadCakes();
  }, []);
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
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const functionName = editingCake ? 'updateCake' : 'addCake';
      const data = editingCake ? {
        ...formData,
        id: editingCake.id
      } : formData;
      const result = await props.$w.cloud.callFunction({
        name: functionName,
        data
      });
      if (result.success) {
        toast({
          title: editingCake ? "更新成功" : "添加成功",
          description: `蛋糕"${formData.name}"已${editingCake ? '更新' : '添加'}`
        });
        resetForm();
        loadCakes();
      } else {
        toast({
          title: "操作失败",
          description: result.message || "操作失败，请重试",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('操作失败:', error);
      toast({
        title: "操作失败",
        description: "网络错误，请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleEdit = cake => {
    setEditingCake(cake);
    setFormData({
      name: cake.name,
      category: cake.category,
      size: cake.size,
      flavor: cake.flavor,
      price: cake.price,
      description: cake.description,
      image: cake.image
    });
    setShowForm(true);
  };
  const handleDelete = async cake => {
    if (!confirm(`确定要删除蛋糕"${cake.name}"吗？`)) {
      return;
    }
    try {
      const result = await props.$w.cloud.callFunction({
        name: 'deleteCake',
        data: {
          id: cake.id
        }
      });
      if (result.success) {
        toast({
          title: "删除成功",
          description: `蛋糕"${cake.name}"已删除`
        });
        loadCakes();
      } else {
        toast({
          title: "删除失败",
          description: result.message || "删除失败，请重试",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('删除失败:', error);
      toast({
        title: "删除失败",
        description: "网络错误，请稍后重试",
        variant: "destructive"
      });
    }
  };
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      size: '',
      flavor: '',
      price: '',
      description: '',
      image: ''
    });
    setEditingCake(null);
    setShowForm(false);
  };
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-900 mb-2" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              管理后台
            </h1>
            <p className="text-amber-700">管理蛋糕信息</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            添加蛋糕
          </Button>
        </header>

        {showForm && <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              {editingCake ? '编辑蛋糕' : '添加新蛋糕'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">蛋糕名称</label>
                  <Input value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} required className="border-amber-200 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">价格</label>
                  <Input type="number" value={formData.price} onChange={e => setFormData({
                ...formData,
                price: e.target.value
              })} required className="border-amber-200 focus:border-amber-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">分类</label>
                  <Select value={formData.category} onValueChange={value => setFormData({
                ...formData,
                category: value
              })}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-500">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="儿童款">儿童款</SelectItem>
                      <SelectItem value="生日款">生日款</SelectItem>
                      <SelectItem value="婚礼款">婚礼款</SelectItem>
                      <SelectItem value="节日款">节日款</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">尺寸</label>
                  <Select value={formData.size} onValueChange={value => setFormData({
                ...formData,
                size: value
              })}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-500">
                      <SelectValue placeholder="选择尺寸" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6寸">6寸</SelectItem>
                      <SelectItem value="8寸">8寸</SelectItem>
                      <SelectItem value="10寸">10寸</SelectItem>
                      <SelectItem value="12寸">12寸</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">口味</label>
                  <Select value={formData.flavor} onValueChange={value => setFormData({
                ...formData,
                flavor: value
              })}>
                    <SelectTrigger className="border-amber-200 focus:border-amber-500">
                      <SelectValue placeholder="选择口味" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="巧克力">巧克力</SelectItem>
                      <SelectItem value="奶油">奶油</SelectItem>
                      <SelectItem value="水果">水果</SelectItem>
                      <SelectItem value="芒果">芒果</SelectItem>
                      <SelectItem value="提拉米苏">提拉米苏</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">图片URL</label>
                <Input value={formData.image} onChange={e => setFormData({
              ...formData,
              image: e.target.value
            })} placeholder="输入图片链接" className="border-amber-200 focus:border-amber-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">描述</label>
                <textarea value={formData.description} onChange={e => setFormData({
              ...formData,
              description: e.target.value
            })} rows={3} className="w-full border-amber-200 focus:border-amber-500 rounded-md p-2" />
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                  {editingCake ? '更新' : '添加'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  取消
                </Button>
              </div>
            </form>
          </div>}

        {loading ? <div className="flex justify-center items-center h-64">
            <div className="text-amber-700">加载中...</div>
          </div> : <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">分类</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">尺寸</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">口味</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">价格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {cakes.map(cake => <tr key={cake.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">{cake.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{cake.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{cake.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">{cake.flavor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">¥{cake.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(cake)} className="border-amber-300 text-amber-700 hover:bg-amber-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(cake)} className="border-red-300 text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
            {cakes.length === 0 && <div className="text-center py-8">
                <p className="text-amber-700">暂无蛋糕数据</p>
              </div>}
          </div>}
      </div>
    </div>;
}