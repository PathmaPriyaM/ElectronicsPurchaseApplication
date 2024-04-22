const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mCart',{ useNewUrlParser : true,useUnifiedTopology:true});
const usersSchema=new mongoose.Schema({
    username: {type:String, required: true, unique :true},
    password: {type :String, required :true},
    phonenumber: {type : Number, required:true},
    email: {type:String, required:true}
},{
    timestamps: {
        createdAt:true,
        updatedAt:true
    }
});
const userModel=mongoose.model('user',usersSchema);
const productSchema=new mongoose.Schema({
    productid: {type:Number,required: true},
    productname: {type :String, required :true},
    productcode: {type:String,required:true},
    description: {type:String,required:true},
    price: {type : Number, required:true},
    rating: {type : Number, required:true},
    manufacturer: {type:String, required:true},
    OStype: {type:String,required:true}
},{
    timestamps: {
        createdAt:true,
        updatedAt:true
    }
});
const productModel=mongoose.model('product',productSchema);
const cartSchema=new mongoose.Schema({
    cartid: {type:Number,unique:true,required:true},
    username: {type :String, required :true},
    productincart: {type : Object, required:true},
    statusofcart: {type:String, required:true}
},{
    timestamps: {
        createdAt:true,
        updatedAt:true
    }
});
const cartModel=mongoose.model('cart',cartSchema);
const orderSchema=new mongoose.Schema({
    orderid: {type:Number, unique:true,required: true},
    cartid: {type : Number, required:true}
},{
    timestamps: {
        createdAt:true,
        updatedAt:true
    }
});
const orderModel=mongoose.model('order',orderSchema);
module.exports={userModel,productModel,cartModel,orderModel};