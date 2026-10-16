import { Request, Response, NextFunction } from 'express';
import { LEARNING_MODULES_CATALOG } from './learning.catalog';

export { LEARNING_MODULES_CATALOG };

export class LearningController {
  getAllModules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        status: 'success',
        results: LEARNING_MODULES_CATALOG.length,
        data: LEARNING_MODULES_CATALOG,
      });
    } catch (error) {
      next(error);
    }
  };

  getModuleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const found = LEARNING_MODULES_CATALOG.find(
        (m) => m.id.toLowerCase() === id.toLowerCase()
      );

      if (!found) {
        return res.status(404).json({
          status: 'fail',
          message: 'Learning module not found',
        });
      }

      res.status(200).json({
        status: 'success',
        data: found,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const learningController = new LearningController();
export default learningController;
