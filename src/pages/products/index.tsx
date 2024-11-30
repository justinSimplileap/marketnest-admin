import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { getAllProducts } from '~/services/api/productApi';

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

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        console.log('response', response);
        setProducts(response?.data);
        toast.success('Products loaded successfully!');
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: (params) => (
        <span className="text-black font-medium dark:text-white">
          {params.value}
        </span>
      ),
    },
    {
      field: 'jpid',
      headerName: 'JPID',
      width: 200,
      renderCell: (params) => (
        <span className="text-black font-medium dark:text-white">
          {params.value}
        </span>
      ),
    },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 200,
      renderCell: (params) => (
        <span className="text-black font-medium dark:text-white">
          {params.value}
        </span>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      renderCell: (params) => (
        <span className="text-black font-medium dark:text-white">
          {params.value}
        </span>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      renderCell: (params) => (
        <span className="text-black font-medium dark:text-white">
          {params.value}
        </span>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      renderCell: (params) => (
        <span className="text-black font-medium dark:text-white">
          {params.value}
        </span>
      ),
    },
    {
      field: 'categoryId',
      headerName: 'Category ID',
      width: 150,
      renderCell: (params) => (
        <span className="text-black font-medium dark:text-white">
          {params.value}
        </span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => router.push(`/products/${params.row.id}`)}
            className=" text-blue-500  px-3 rounded-lg"
          >
            Edit
          </button>
          <button className="text-red-500 px-3 rounded-lg">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product Listing</h1>
      <div className="mb-4">
        <button
          onClick={() => router.push('/products/add')}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Add Product
        </button>
      </div>
      <div className="">
        <DataGrid rows={products} columns={columns} />
      </div>
    </div>
  );
};

export default ProductListing;
