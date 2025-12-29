exports.main = async (event, context) => {
  try {
    const tcb = await cloud.getCloudInstance();
    const db = tcb.database();
    
    const result = await db.collection('cakes').get();
    
    return {
      success: true,
      data: result.data || []
    };
  } catch (error) {
    console.error('获取蛋糕列表失败:', error);
    return {
      success: false,
      message: '获取蛋糕列表失败',
      error: error.message
    };
  }
};