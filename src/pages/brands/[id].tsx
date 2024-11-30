import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import {
  addBrand,
  getBrandById,
  updateBrand,
} from '~/services/api/brandAndCategories';

interface BrandFormData {
  name: string;
}

const BrandForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { query, push } = useRouter();
  const { id } = query;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormData>();

  useEffect(() => {
    if (id && id !== 'add') {
      // If `id` is provided and it's not "add", we're in edit mode
      setIsEditMode(true);
      setLoading(true);

      getBrandById(id as string)
        .then((brand) => {
          reset({ name: brand.name });
        })
        .catch((error) => {
          toast.error('Failed to load brand data');
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      // If `id` is "add" or undefined, we're in add mode
      setIsEditMode(false);
      reset({ name: '' }); // Clear the form for adding
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<BrandFormData> = async (data) => {
    setLoading(true);
    try {
      if (isEditMode) {
        // Update brand
        await updateBrand(id as string, data);
        toast.success('Brand updated successfully');
      } else {
        // Add brand
        await addBrand(data);
        toast.success('Brand added successfully');
      }
      push('/brands'); // Redirect to the brand list
    } catch (error) {
      toast.error('Failed to save brand');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isEditMode ? 'Edit Brand' : 'Add Brand'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Brand Name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Brand name is required' })}
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            disabled={loading}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Saving...' : isEditMode ? 'Update Brand' : 'Add Brand'}
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
