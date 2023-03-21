import { container } from "tsyringe";
import { ConvertUseCase } from "../../../currency/uses-cases/convert-use.case";

container.register<ConvertUseCase>(ConvertUseCase, ConvertUseCase);
