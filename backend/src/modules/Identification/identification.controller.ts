
import { Request, Response, NextFunction } from 'express';
import { IdentificationModel } from './identification.model';
import { AppError } from '@/middlewares/error.middleware';



export class IdentificationController {
    createIdentification = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const data  = req.body
            const Identification =  await IdentificationModel.create(data)
            if(!Identification){
                throw new AppError('error in the identification data' ,404)
            }
            res.status(201).json({status:'success' ,data:Identification})
        }
        catch(err){
            next(err)
        }
    }
    getAllIdentification = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const getAllIdentification = await IdentificationModel.find()
            if(!getAllIdentification){
                throw new AppError('error in identifaction',404)
            }
            res.status(200).json({status:'success' , data:getAllIdentification})
        }
        catch(err){
            next(err);
        }
    }
    getIdentificationById = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {id} = req.params
            const identification = await IdentificationModel.findById(id)
            if(!identification){
                throw new AppError('identification not found',404)
            }
            res.status(200).json({status:'success', data:identification})
        }
        catch(err){
            next(err)
        }
    }
}

export const identificationController = new IdentificationController();

