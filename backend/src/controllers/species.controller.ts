import { Request, Response, NextFunction } from 'express';
import { SpeciesModel } from '../models/species.model';
import { AppError } from '../middlewares/error.middleware';

export async function createSpecies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { scientificName } = req.body;
    if (!scientificName) {
      throw new AppError('scientificName is required', 400, 'VALIDATION_ERROR');
    }

    const existing = await SpeciesModel.findOne({ scientificName });
    if (existing) {
      throw new AppError(`Species with scientificName "${scientificName}" already exists`, 409, 'CONFLICT');
    }

    const species = await SpeciesModel.create(req.body);
    res.status(201).json(species);
  } catch (error) {
    next(error);
  }
}

export async function getAllSpecies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const searchQuery = (req.query.search || req.query.q) as string | undefined;

    let filter: Record<string, any> = {};
    if (searchQuery && searchQuery.trim()) {
      filter = {
        $or: [
          { scientificName: { $regex: searchQuery.trim(), $options: 'i' } },
          { commonName: { $regex: searchQuery.trim(), $options: 'i' } },
          { family: { $regex: searchQuery.trim(), $options: 'i' } },
          { genus: { $regex: searchQuery.trim(), $options: 'i' } },
        ],
      };
    }

    const species = await SpeciesModel.find(filter);
    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
}

export async function searchSpecies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const q = (req.query.q || req.query.search || '') as string;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const skip = (page - 1) * limit;

    let filter: Record<string, any> = {};
    if (q.trim()) {
      filter = {
        $or: [
          { scientificName: { $regex: q.trim(), $options: 'i' } },
          { commonName: { $regex: q.trim(), $options: 'i' } },
          { family: { $regex: q.trim(), $options: 'i' } },
          { genus: { $regex: q.trim(), $options: 'i' } },
        ],
      };
    }

    const [species, total] = await Promise.all([
      SpeciesModel.find(filter).skip(skip).limit(limit),
      SpeciesModel.countDocuments(filter),
    ]);

    res.status(200).json({
      data: species,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getSpeciesById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const species = await SpeciesModel.findById(id);
    if (!species) {
      throw new AppError(`Species with ID ${id} not found`, 404, 'NOT_FOUND');
    }
    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
}

export async function updateSpecies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await SpeciesModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      throw new AppError(`Species with ID ${id} not found`, 404, 'NOT_FOUND');
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteSpecies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await SpeciesModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new AppError(`Species with ID ${id} not found`, 404, 'NOT_FOUND');
    }
    res.status(200).json({ message: `Species with ID ${id} successfully deleted` });
  } catch (error) {
    next(error);
  }
}
