const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


exports.stripeController = (async(req,res,next)=>{

    try{
        const {name,packagePrice  , image} = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            mode :'payment',
            success_url :  `${process.env.SERVER_URL}/success`,
            cancel_url  : `${process.env.SERVER_URL}/cancel`,
            line_items :[ {
                price_data : {
                    currency:'inr',
                    product_data :{
                        name :name,
                        images : [image.url]
                    } ,
                    unit_amount : packagePrice*100 ,
                },
                quantity :1
            }]
        })
await res.status(200).json({url : session.url})
    }catch(err){
        await res.status(200).json({error : err.message})
    }
})