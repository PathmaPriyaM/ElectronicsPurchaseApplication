const {cartModel,orderModel}=require('../Models/mCartSchema')
exports.generatecartId = async () => {
    const cart = await cartModel.find({});
    const Id = 101 + cart.length;
    return Id;
  };

  exports.generateOrderId=async()=>{
    const order=await orderModel.find({});
    const Id=2001+order.length;
    return Id;
  }