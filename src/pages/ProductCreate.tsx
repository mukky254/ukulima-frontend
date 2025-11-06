import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { productsAPI } from '../services/api';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductForm {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  specifications: {
    grade: string;
    variety: string;
    organic: boolean;
    pesticideFree: boolean;
  };
  location: {
    city: string;
    country: string;
  };
}

const ProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductForm>();

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Livestock',
    'Dairy',
    'Poultry'
  ];

  const units = ['kg', 'g', 'lb', 'piece', 'bunch', 'crate'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductForm) => {
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you'd upload images to cloud storage first
      const productData = {
        ...data,
        images: images.map(() => 'https://via.placeholder.com/400x300?text=Product+Image') // Placeholder
      };

      await productsAPI.create(productData);
      toast.success('Product listed successfully!');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">List New Product</h1>
        <p className="text-gray-600 mt-2">Sell your fresh produce to buyers nationwide</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                {...register('name', { required: 'Product name is required' })}
                type="text"
                className="input-field"
                placeholder="e.g., Fresh Tomatoes"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="input-field"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <input
                {...register('subcategory')}
                type="text"
                className="input-field"
                placeholder="e.g., Cherry Tomatoes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                {...register('unit', { required: 'Unit is required' })}
                className="input-field"
              >
                <option value="">Select Unit</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              {errors.unit && (
                <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="input-field"
              placeholder="Describe your product in detail..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₦) *
              </label>
              <input
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 1, message: 'Price must be greater than 0' }
                })}
                type="number"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity Available *
              </label>
              <input
                {...register('quantity', { 
                  required: 'Quantity is required',
                  min: { value: 1, message: 'Quantity must be at least 1' }
                })}
                type="number"
                className="input-field"
                placeholder="0"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order *
              </label>
              <input
                {...register('minOrder', { 
                  required: 'Minimum order is required',
                  min: { value: 1, message: 'Minimum order must be at least 1' }
                })}
                type="number"
                className="input-field"
                placeholder="1"
                defaultValue={1}
              />
              {errors.minOrder && (
                <p className="text-red-500 text-sm mt-1">{errors.minOrder.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <select
                {...register('specifications.grade')}
                className="input-field"
              >
                <option value="">Select Grade</option>
                <option value="A">Grade A (Premium)</option>
                <option value="B">Grade B (Standard)</option>
                <option value="C">Grade C (Economy)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variety
              </label>
              <input
                {...register('specifications.variety')}
                type="text"
                className="input-field"
                placeholder="e.g., Roma, Beefsteak"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  {...register('specifications.organic')}
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Organic</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  {...register('specifications.pesticideFree')}
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Pesticide Free</span>
              </label>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                {...register('location.city', { required: 'City is required' })}
                type="text"
                className="input-field"
                placeholder="e.g., Nairobi"
              />
              {errors.location?.city && (
                <p className="text-red-500 text-sm mt-1">{errors.location.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                {...register('location.country', { required: 'Country is required' })}
                type="text"
                className="input-field"
                placeholder="e.g., Kenya"
                defaultValue="Kenya"
              />
              {errors.location?.country && (
                <p className="text-red-500 text-sm mt-1">{errors.location.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Product Images
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center space-y-3"
            >
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <span className="text-green-600 font-semibold">Click to upload</span>
                <span className="text-gray-600"> or drag and drop</span>
              </div>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
            </label>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Publishing...' : 'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
