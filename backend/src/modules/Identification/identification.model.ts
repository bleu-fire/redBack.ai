
import { Document,Schema,model,Types } from 'mongoose';



interface Identify extends Document {
    userId:Types.ObjectId;
    imageUrl:string;
    status:string;
    uncertaintyLevel:string;
}

const identificationModel  = new Schema<Identify> ({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    imageUrl:{
        type:String,
        required:[true,'you need a image'],

    },
    status:{
        type:String,
        required:true,

    },
    uncertaintyLevel:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

export const IdentificationModel =model<Identify>(
  'Identification',
  identificationModel
);
