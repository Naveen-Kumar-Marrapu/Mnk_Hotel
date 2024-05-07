import mongoose from 'mogoose';

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    image: {
        type: String

    },
    bestselleer: {
        type: String

    },
    description:{
        type: String
    },
    firm:[
        {
          type: mongoose.Schema.Types.objesctId, 
          ref:'firm' 
        }
    ]
})
