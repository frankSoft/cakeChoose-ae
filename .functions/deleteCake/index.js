exports.main = async (event, context) => {
  try {
    const { id } = event.data;
    
    if (!id) {
      return {
        success: false,
        message: '缺少蛋糕ID'
      };
    }
    
    const tcb = await cloud.getCloudInstance();
    const db = tcb.database();
    
    await db.collection('cakes').doc(id).remove();
    
    return {
      success: true,
      message: '蛋糕删除成功'
    };
  } catch (error) {
    console.error('删除蛋糕失败:', error);
    return {
      success: false,
      message: '删除蛋糕失败',
      error: error.message
    };
  }
};