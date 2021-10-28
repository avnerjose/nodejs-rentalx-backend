import { Request, Response } from "express";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}
  handle(req: Request, res: Response): Response {
    const categoriesList = this.listCategoriesUseCase.execute();

    return res.status(200).json(categoriesList);
  }
}

export { ListCategoryController };
