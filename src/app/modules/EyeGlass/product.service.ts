import QueryBuilder from "../../builder/QueryBuilder";
import { TEyeglasses } from "./product.interface";
import { Eyeglass } from "./product.model";

const createProductIntoDB = async (payload: TEyeglasses) => {
  const result = await Eyeglass.create(payload);
  return result;
};

const getAllProductIntoDB = async (query: Record<string, unknown>) => {
  const minPrice = query.minPrice as number;
  const maxPrice = query.maxPrice as number;
  const productQuery = new QueryBuilder(Eyeglass.find(), query)
    .filter()
    .filterByPriceRange(minPrice, maxPrice);
  const result = await productQuery.modelQuery;
  return result;
};

const deleteProductIntoDB = async (id: string) => {
  const result = await Eyeglass.findByIdAndDelete(id);
  return result;
};
const updateProductIntoDB = async (
  id: string,
  payload: Partial<TEyeglasses>
) => {
  const result = await Eyeglass.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const EyeGlassServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
};