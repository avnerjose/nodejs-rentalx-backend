import { Request, Response, Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req: Request, res: Response) => {
  return createSpecificationController.handle(req, res);
});

export { specificationsRoutes };
