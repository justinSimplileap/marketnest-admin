import ProtectedAxiosInstance from '../ProtectedAxiosInstance';

// Brand APIs
export const addBrand = async (data: { name: string }) => {
  const response = await ProtectedAxiosInstance.post(
    '/category/brand/create',
    data
  );
  return response.data;
};

export const updateBrand = async (id: string, data: { name: string }) => {
  const response = await ProtectedAxiosInstance.put(
    `/category/brand/${id}`,
    data
  );
  return response.data;
};

export const getBrandById = async (id: string) => {
  const response = await ProtectedAxiosInstance.get(`/category/brand/${id}`);
  return response.data;
};

// Category APIs
export const addCategory = async (data: { name: string }) => {
  const response = await ProtectedAxiosInstance.post(
    '/category/category/create',
    data
  );
  return response.data;
};

export const updateCategory = async (id: string, data: { name: string }) => {
  const response = await ProtectedAxiosInstance.put(
    `/category/category/${id}`,
    data
  );
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await ProtectedAxiosInstance.get(`/category/category/${id}`);
  return response.data;
};
