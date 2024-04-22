const {userModel,productModel,cartModel,orderModel}=require('../Models/mCartSchema');
const validator=require('../Utilities/validator');
const helper=require('../Utilities/helpers');

exports.signUp=async (req,res)=>{
    if(validator.ValidatePassword(req.body.password)){
        //console.log(req.body.password);
        if(validator.ValidatePhoneNum(req.body.phonenumber)){
        //console.log(req.body.phonenumber);
        const user=await userModel.find({username:req.body.username},{_id:0,__v:0});
        if(user.length>0){res.json({"message":"User already registered"})}
        else{
        const user=await userModel.create({
            username:req.body.username,
            password:req.body.password,
            phonenumber:req.body.phonenumber,
            email:req.body.email
        });
        res.json({"message":`User Registered with Name: ${req.body.username}`});
        }
    }else{
            res.json({"message":"Phone number should be 10 digits"})
    }
    }else{
        res.json({"message":"Minimum 5 characters should be there in password"})
    }

};

exports.login=async (req,res)=>{

    const user=await userModel.find({username:req.body.username},{_id:0,__v:0});
    if(user.length==0){
        res.json({"message":'No Account Found Please SignUp '})
        return false
    }
    else if((user[0].username===req.body.username)&&(user[0].password===req.body.password)){
        // res.json({"message":`Welcome Back ${user[0].username}`});
        res.json({"message":`Welcome Back ${req.body.username}`});

        return true;
    }
}
exports.showMobile=async (req,res)=>{
    const product=await productModel.create({
        productid:1,
        productname:"Samsung Galaxy Note 7",
        productcode:"MOB-120",
        description:"64GB, Coral Blue",
        price:60569,
        rating:4,
        manufacturer:"Samsung",
        OStype:"Android"
    })
    res.json({
        data:product
    });
}

exports.showTablets=async (req,res)=>{
    const product=await productModel.create({
        productid:2,
        productname:"Apple iPad Mini 2",
        productcode:"TAB-120",
        description:"16GB, White",
        price:19442,
        rating:4,
        manufacturer:"Apple",
        OStype:"iOS"
    })
    res.json({
        data:product
    });
}


exports.addCart=async (req,res)=>{
    const Id = await helper.generatecartId();
    const cart=await cartModel.find({username:req.body.username},{_id:0,__v:0});
    if(cart.length>0){
        res.json({"message":"User's cart is already available, append to the same cart"});
    }else{
    const cart=await cartModel.create({
        cartid: Id, 
        username:req.body.username,
        productincart:req.body.productincart,
        statusofcart:"Opened"
    })
        res.json({
            data:cart,
            "message":`New items got inserted into the cart with the ID : ${Id}`
        })
    }
   
}

exports.getAllUserCarts=async (req,res)=>{
    const cart=await cartModel.find({},{_id:0,__v:0});
    if(cart.length>0){
        res.json({data:cart})
    }else{
        res.json({"Message":"Cart is Empty"})
    }
}
exports.getSpecificUserCarts=async (req,res)=>{
    const cart=await cartModel.find({username:req.params.username},{_id:0,__v:0});
    if(cart.length>0){
        res.json({data:cart})
    }else{
        res.json({"Message":`No cart is found for this Username ${req.params.username}`})
    }
}

exports.updateCart=async (req,res)=>{
    const cart=await cartModel.findOneAndUpdate(
        { username:req.params.username },
        req.body,
        {new:true,runValidators:true}
        );
    if(cart!=null){
        res.json({data:cart,"message":`CartID:${cart.cartid} updated`})
    }else{
        res.json({"message":`No Cart Available in Username ${req.params.username}`})
    }
}

exports.addOrder=async (req,res)=>{
    const id=await helper.generateOrderId();
    const cart=await cartModel.find({username:req.params.username});
    //console.log(cart);
    if(cart.length>0){
        const order=await orderModel.create({
            orderid:id,
            cartid:cart[0].cartid
        })  
    const carts=await cartModel.findOneAndUpdate(
            { username:req.params.username },
            {statusofcart:"Closed"},
            {new:true,runValidators:true}
            );
    res.json({"message":`New order placed with the ID :${order.orderid}`})
    }
    
}
exports.deleteProduct=async (req,res)=>{
    const delProduct=await productModel.deleteOne({productid:req.params.id});
    if(delProduct.deletedCount==0){
        res.json({"message":"Product not available"});
    }else{
        res.json({"message":"Product removed successfully"});
    }
}
exports.invalidpath=async (req,res)=>{
    res.json({"message":"Resource Not Found"})
}