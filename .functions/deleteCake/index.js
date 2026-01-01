const cloud = require('wx-server-sdk');

// 初始化云开发
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  console.log('deleteCake 云函数开始执行...');
  
  try {
    const { id } = event.data;
    
    console.log('接收到的ID:', id);
    
    if (!id) {
      console.log('验证失败: 缺少ID');
      return {
        success: false,
        message: '缺少蛋糕ID'
      };
    }
    
    console.log('获取云开发实例...');
    const db = cloud.database();
    
    // 先检查记录是否存在
    const checkResult = await db.collection('cakes').doc(id).get();
    if (!checkResult.data) {
      console.log('蛋糕不存在:', id);
      return {
        success: false,
        message: '蛋糕不存在或已被删除'
      };
    }
    
    console.log('删除蛋糕:', id);
    await db.collection('cakes').doc(id).remove();
    console.log('删除成功');
    
    return {
      success: true,
      message: '蛋糕删除成功'
    };
  } catch (error) {
    console.error('删除蛋糕失败:', error);
    return {
      success: false,
      message: '删除蛋糕失败: ' + error.message,
      error: error.message,
      stack: error.stack
    };
  }
};