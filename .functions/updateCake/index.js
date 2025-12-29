exports.main = async (event, context) => {
  try {
    const { id, name, category, size, flavor, price, description, image } = event.data;
    
    if (!id) {
      return {
        success: false,
        message: '缺少蛋糕ID'
      };
    }
    
    if (!name || !category || !size || !flavor || !price) {
      return {
        success: false,
        message: '请填写完整的蛋糕信息'
      };
    }
    
    const tcb = await cloud.getCloudInstance();
    const db = tcb.database();
    
    const updateData = {
      name,
      category,
      size,
      flavor,
      price: parseFloat(price),
      description: description || '',
      image: image || '',
      updatedAt: new Date().toISOString()
    };
    
    const result = await db.collection('cakes').doc(id).update(updateData);
    
    return {
      success: true,
      data: updateData,
      message: '蛋糕更新成功'
    };
  } catch (error) {
    console.error('更新蛋糕失败:', error);
    return {
      success: false,
      message: '更新蛋糕失败',
      error: error.message
    };
  }
};