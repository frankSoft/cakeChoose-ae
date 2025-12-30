exports.main = async (event, context) => {
  try {
    const tcb = await cloud.getCloudInstance();
    const db = tcb.database();
    
    // 检查集合是否存在，如果不存在则创建并初始化数据
    try {
      const result = await db.collection('cakes').get();
      
      // 如果集合为空，初始化示例数据
      if (!result.data || result.data.length === 0) {
        const sampleData = [
          {
            id: '1',
            name: '儿童卡通蛋糕',
            category: '儿童款',
            size: '8寸',
            flavor: '奶油',
            price: 168,
            description: '可爱的卡通造型，深受小朋友喜爱',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: '生日快乐蛋糕',
            category: '生日款',
            size: '10寸',
            flavor: '水果',
            price: 268,
            description: '新鲜水果装饰，生日庆典首选',
            image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            name: '浪漫婚礼蛋糕',
            category: '婚礼款',
            size: '12寸',
            flavor: '提拉米苏',
            price: 588,
            description: '精致优雅，婚礼完美之选',
            image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '4',
            name: '圣诞节日蛋糕',
            category: '节日款',
            size: '8寸',
            flavor: '巧克力',
            price: 198,
            description: '节日氛围浓厚，甜蜜分享',
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '5',
            name: '小熊维尼蛋糕',
            category: '儿童款',
            size: '6寸',
            flavor: '芒果',
            price: 138,
            description: '维尼熊造型，芒果口味香甜',
            image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '6',
            name: '经典巧克力蛋糕',
            category: '生日款',
            size: '8寸',
            flavor: '巧克力',
            price: 188,
            description: '浓郁巧克力，经典永恒',
            image: 'https://images.unsplash.com/photo-1612198188060-c7b2b5d9b6b5?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        
        // 批量插入示例数据
        await db.collection('cakes').add(sampleData);
        
        // 重新获取数据
        const newResult = await db.collection('cakes').get();
        return {
          success: true,
          data: newResult.data || []
        };
      }
      
      return {
        success: true,
        data: result.data || []
      };
    } catch (collectionError) {
      // 如果集合不存在，创建集合并初始化数据
      if (collectionError.message && collectionError.message.includes('Collection not exists')) {
        const sampleData = [
          {
            id: '1',
            name: '儿童卡通蛋糕',
            category: '儿童款',
            size: '8寸',
            flavor: '奶油',
            price: 168,
            description: '可爱的卡通造型，深受小朋友喜爱',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: '生日快乐蛋糕',
            category: '生日款',
            size: '10寸',
            flavor: '水果',
            price: 268,
            description: '新鲜水果装饰，生日庆典首选',
            image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            name: '浪漫婚礼蛋糕',
            category: '婚礼款',
            size: '12寸',
            flavor: '提拉米苏',
            price: 588,
            description: '精致优雅，婚礼完美之选',
            image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '4',
            name: '圣诞节日蛋糕',
            category: '节日款',
            size: '8寸',
            flavor: '巧克力',
            price: 198,
            description: '节日氛围浓厚，甜蜜分享',
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '5',
            name: '小熊维尼蛋糕',
            category: '儿童款',
            size: '6寸',
            flavor: '芒果',
            price: 138,
            description: '维尼熊造型，芒果口味香甜',
            image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '6',
            name: '经典巧克力蛋糕',
            category: '生日款',
            size: '8寸',
            flavor: '巧克力',
            price: 188,
            description: '浓郁巧克力，经典永恒',
            image: 'https://images.unsplash.com/photo-1612198188060-c7b2b5d9b6b5?w=500',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        
        // 批量插入示例数据
        await db.collection('cakes').add(sampleData);
        
        // 重新获取数据
        const result = await db.collection('cakes').get();
        return {
          success: true,
          data: result.data || []
        };
      }
      throw collectionError;
    }
  } catch (error) {
    console.error('获取蛋糕列表失败:', error);
    return {
      success: false,
      message: '获取蛋糕列表失败: ' + error.message,
      error: error.message
    };
  }
};