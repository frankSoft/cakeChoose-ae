exports.main = async (event, context) => {
  try {
    const { name, category, size, flavor, price, description, image } = event.data;
    
    if (!name || !category || !size || !flavor || !price) {
      return {
        success: false,
        message: '请填写完整的蛋糕信息'
      };
    }
    
    const tcb = await cloud.getCloudInstance();
    const db = tcb.database();
    
    const cakeData = {
      name,
      category,
      size,
      flavor,
      price: parseFloat(price),
      description: description || '',
      image: image || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const result = await db.collection('cakes').add(cakeData);
    
    return {
      success: true,
      data: {
        id: result.id,
        ...cakeData
      },
      message: '蛋糕添加成功'
    };
  } catch (error) {
    console.error('添加蛋糕失败:', error);
    return {
      success: false,
      message: '添加蛋糕失败',
      error: error.message
    };
  }
};