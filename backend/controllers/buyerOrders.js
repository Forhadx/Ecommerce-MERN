const OrdersModel = require('../models/Orders');

exports.addOrder = async (req, res, next)=>{
    try{ 
        let order = new OrdersModel(req.body);
        await order.save();
        console.log('order: ',order)
        if(!order){
            console.log('order not added!')
        }
        res.json({message:'order added' , order: order})
    }catch(err){
        console.log(err);
    }
}

