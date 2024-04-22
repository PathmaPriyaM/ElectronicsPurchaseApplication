const express=require('express');
const router=express.Router();
const mcartController=require('../Controller/mcartcontroller');

router.post('/signup',mcartController.signUp);
router.get('/login',mcartController.login);
router.get('/mobiles',mcartController.showMobile);
router.get('/tablets',mcartController.showTablets);
router.get('/carts',mcartController.getAllUserCarts);
router.get('/carts/:username',mcartController.getSpecificUserCarts);
router.post('/carts',mcartController.addCart);
router.put('/carts/:username',mcartController.updateCart);
router.post('/orders/:username',mcartController.addOrder);
router.delete('/products/:id',mcartController.deleteProduct);
router.all('*',mcartController.invalidpath);
module.exports=router;