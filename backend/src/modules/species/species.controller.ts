import { Request, Response, NextFunction } from 'express';
import Species from './species.model';
import { AppError } from '../../middlewares/error.middleware';

class SpeciesController {
  createSpecies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        scientificName,
        commonName,
        family,
        genus,
        description,
        habitat,
        distribution,
        behavior,
        venomInfo,
        conservationStatus,
        imageUrls,
      } = req.body;

      const newSpecies = await Species.create({
        scientificName,
        commonName,
        family,
        genus,
        description,
        habitat,
        distribution,
        behavior,
        venomInfo,
        conservationStatus,
        imageUrls,
      });

      if (!newSpecies) {
            throw new AppError('Species not found', 404);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Created successfully',
        data: newSpecies,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllSpecies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.query  
      const speciesList = await Species.find(data);
      return res.status(200).json({
        status: 'success',
        message: 'Successfully retrieved data',
        results: speciesList.length,
        data: speciesList,
      });
    } catch (error) {
      next(error);
    }
  };

  searchSpecies = async (req: Request, res: Response, next: NextFunction) => {
    try {


    } catch (err) {
      next(err);
    }
  };

  getSpeciesById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const species = await Species.findById(id);

      if (!species) {
        throw new AppError('Species not found', 404);
      }

      return res.status(200).json({
        status: 'success',
        data: species,
      });
    } catch (err) {
      next(err);
    }
  };

  updateSpecies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedSpecies = await Species.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (!updatedSpecies) {
        throw new AppError('Species not found', 404);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Updated successfully',
        data: updatedSpecies,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteSpecies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedSpecies = await Species.findByIdAndDelete(id);

      if (!deletedSpecies) {
        throw new AppError('Species not found', 404);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Deleted successfully',
        data: deletedSpecies,
      });
    } catch (err) {
      next(err);
    }
  };
}

export const speciesController = new SpeciesController();
export default speciesController;

