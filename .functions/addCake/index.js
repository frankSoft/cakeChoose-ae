const cloud = require('wx-server-sdk');

// 初始化云开发
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  console.log('addCake 云函数开始执行...');
  
  try {
    const { name, category, size, flavor, price, description, image } = event.data;
    
    console.log('接收到的数据:', { name, category, size, flavor, price, description, image });
    
    // 验证必填字段
    if (!name || !category || !size || !flavor || !price) {
      console.log('验证失败: 缺少必填字段');
      return {
        success: false,
        message: '请填写完整的蛋糕信息（名称、分类、尺寸、口味、价格为必填项）'
      };
    }
    
    // 验证价格格式
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      console.log('价格格式验证失败:', price);
      return {
        success: false,
        message: '请输入有效的价格（大于0的数字）'
      };
    }
    
    console.log('获取云开发实例...');
    const db = cloud.database();
    
    const cakeData = {
      name,
      category,
      size,
      flavor,
      price: numPrice,
      description: description || '',
      image: image || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('准备插入数据:', cakeData);
    
    const result = await db.collection('cakes').add(cakeData);
    console.log('数据插入成功，ID:', result.id);
    
    return {
      success: true,
      data: {
        _id: result.id,
        ...cakeData
      },
      message: '蛋糕添加成功'
    };
  } catch (error) {
    console.error('添加蛋糕失败:', error);
    return {
      success: false,
      message: '添加蛋糕失败: ' + error.message,
      error: error.message,
      stack: error.stack
    };
  }
};