import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import {
  addCategory,
  getCategoryById,
  updateCategory,
} from '~/services/api/brandAndCategories';
import { getCategories } from '~/services/api/productApi';

interface CategoryData {
  name: string;
  parentCategoryId?: number;
}

const Category: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  console.log('categories', categories);
  const { query, push } = useRouter();
  const { id } = query;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryData>();

  useEffect(() => {
    if (id && id !== 'add') {
      setIsEditMode(true);
      setLoading(true);

      // Load the category by ID for editing
      getCategoryById(id as string)
        .then((category) => {
          reset({
            name: category.name,
            parentCategoryId: category.parentCategoryId || undefined,
          });
        })
        .catch((error) => {
          toast.error('Failed to load category data');
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      setIsEditMode(false);
      reset({ name: '', parentCategoryId: undefined });
    }

    // Fetch all categories for the parent category dropdown
    const fetchCategories = async () => {
      try {
        const response: any = await getCategories();
        if (response.status === 'success') {
          const data = response.data;
          console.log('Categories:', data);

          if (data.length === 0) {
            toast('No categories available.');
          }

          setCategories(data); // Set the categories to state
        } else {
          toast.error('Failed to fetch categories');
        }
      } catch (error) {
        toast.error('Failed to fetch categories');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [id, reset]);

  const onSubmit: SubmitHandler<CategoryData> = async (data) => {
    setLoading(true);
    try {
      if (isEditMode) {
        // Update category
        await updateCategory(id as string, data);
        toast.success('Category updated successfully');
      } else {
        // Add new category
        await addCategory(data);
        toast.success('Category added successfully');
      }
      push('/products'); // Redirect to the category list
    } catch (error) {
      toast.error('Failed to save category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-8 max-w-xl mt-8 ml-8">
      <h2 className="form-title">
        {isEditMode ? 'Edit Category' : 'Add Category'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Category name is required' })}
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            disabled={loading}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        {/* Parent Category Dropdown */}
        <div className="form-group">
          <label htmlFor="parentCategoryId" className="form-label">
            Parent Category (Optional)
          </label>
          <select
            id="parentCategoryId"
            {...register('parentCategoryId')}
            className="form-input"
            disabled={loading}
          >
            <option value="">None (Top Level)</option>
            {categories.length === 0 ? (
              <option disabled>No categories available</option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading
            ? 'Saving...'
            : isEditMode
              ? 'Update Category'
              : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default Category;
