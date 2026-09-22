import { identificationController } from './identification.controller';

import { Router } from 'express';


const router = Router()

router.post('/',identificationController.createIdentification)
router.get('/',identificationController.getAllIdentification)
router.get('/:id',identificationController.getIdentificationById)


