import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import {
  addProduct,
  getProductById,
  updateProduct,
  getCategories,
  getBrands,
} from '~/services/api/productApi';
import Link from 'next/link';
import InputGroup from '~/components/InputGroup';
import SelectGroupOne from '~/components/SelectOption/SelectGroupOne';
import { CldUploadWidget } from 'next-cloudinary';

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  images: any[];
  categoryId: any;
  brandId: any;
}

const ProductForm = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    images: [],
    categoryId: null,
    brandId: null,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  console.log('categories', categories);
  console.log('brands', brands);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: any = await getCategories();
        if (response.status === 'success') {
          setCategories(response?.data);
        } else {
          toast.error('Failed to fetch categories');
        }
      } catch (error) {
        toast.error('Error fetching categories');
      }
    };

    const fetchBrands = async () => {
      try {
        const response: any = await getBrands();
        if (response.status === 'success') {
          setBrands(response.data);
        } else {
          toast.error('Failed to fetch brands');
        }
      } catch (error) {
        toast.error('Error fetching brands');
      }
    };

    if (id !== 'add' && !isNaN(Number(id))) {
      setIsEditing(true);
      const fetchProduct = async () => {
        try {
          const data = await getProductById(Number(id));
          setProduct(data);
        } catch (error) {
          toast.error('Failed to fetch product');
        }
      };
      fetchProduct();
    } else {
      setIsEditing(false);
    }

    fetchCategories();
    fetchBrands();
  }, [id]);

  const handleAddImageUrl = (imageUrl: string) => {
    const newImage = {
      imageUrl: imageUrl.trim(),
      orderBy: product.images.length + 1,
    };
    setProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), newImage],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('product', product);
    try {
      if (isEditing) {
        await updateProduct(Number(id), product);
        toast.success('Product updated successfully');
      } else {
        await addProduct(product);
        toast.success('Product added successfully');
      }
      router.push('/products');
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-dark-2 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4 text-dark dark:text-white">
          {isEditing ? 'Edit Product' : 'Add Product'}
        </h2>
        <div className="flex gap-4">
          <Link href="/brands/add">
            <button className="btn-purple-blue">
              <span>Add Brands</span>
            </button>
          </Link>
          <Link href="/category/add">
            <button className="btn-cyan-blue">
              <span>Add Categories</span>
            </button>
          </Link>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-dark dark:text-white"
      >
        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Product Name"
            type="text"
            value={product.name}
            placeholder="Please Enter Product Name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            customClasses="w-full"
          />

          <InputGroup
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            placeholder="Please Enter Price"
            customClasses="w-full"
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Description
          </label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <InputGroup
            label="Quantity"
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: Number(e.target.value) })
            }
            placeholder="Please Enter Quantity"
            customClasses="w-full"
          />

          <SelectGroupOne
            label="Category"
            value={product.categoryId || ''} // default to empty string if null
            onChange={(e) =>
              setProduct({ ...product, categoryId: Number(e.target.value) })
            }
            options={categories}
            placeholder="Select a category"
            customClasses="w-full"
          />

          <SelectGroupOne
            label="Brand"
            value={product.brandId || ''} // default to empty string if null
            onChange={(e) =>
              setProduct({ ...product, brandId: Number(e.target.value) })
            }
            options={brands}
            placeholder="Select a brand"
            customClasses="w-full"
          />
        </div>

        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Images
          </label>

          <CldUploadWidget
            uploadPreset="product_images"
            onSuccess={({ info }) => {
              if (typeof info !== 'string' && info?.secure_url) {
                handleAddImageUrl(info.secure_url);
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

          <div className="mt-4 space-y-2">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-2 rounded"
              >
                <span className="truncate">{image?.imageUrl}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 dark:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
