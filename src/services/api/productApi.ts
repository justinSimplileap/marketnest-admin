import ProtectedAxiosInstance from '../ProtectedAxiosInstance';

// Define interfaces for categories and brands
interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

// Define the product data structure
interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  images: string[];
  categoryId: number;
  brandId: number;
}

// Add a new product
export const addProduct = async (data: Product) => {
  try {
    const response = await ProtectedAxiosInstance.post('/product/create', data);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Get all products
export const getAllProducts = async (): Promise<any> => {
  try {
    const response = await ProtectedAxiosInstance.get('/product/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

// Get a product by ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await ProtectedAxiosInstance.get(`/product/${id}`);
    return response.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: number, data: Product) => {
  try {
    const response = await ProtectedAxiosInstance.put(`/product/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: number) => {
  try {
    const response = await ProtectedAxiosInstance.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await ProtectedAxiosInstance.get('/category/category/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get all brands
export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await ProtectedAxiosInstance.get('/category/brand/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};
