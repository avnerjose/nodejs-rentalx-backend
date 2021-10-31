import fs from "fs";
import csvParse from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path); //Creates Stream
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile); //Stream.pipe use stream concept and sends data to the inner function

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path); //Deletes temporary file
          resolve(categories);
        })
        .on("error", (error) => reject(error));
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create(category);
      }
    });
  }
}

export { ImportCategoryUseCase };
