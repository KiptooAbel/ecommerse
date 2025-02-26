import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';

const Create = ({ categories }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    author: '',
    description: '',
    genre: '',
    price: '',
    stock: '',
    isbn: '',
    cover_image: null,
    additional_images: [],
    categories: [],
  });

  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('books.store'));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setData('cover_image', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setData('additional_images', [...data.additional_images, ...files]);
    
    // Create previews for all new images
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...data.additional_images];
    newImages.splice(index, 1);
    setData('additional_images', newImages);

    const newPreviews = [...additionalImagePreviews];
    newPreviews.splice(index, 1);
    setAdditionalImagePreviews(newPreviews);
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = [...e.target.selectedOptions];
    const selectedCategories = selectedOptions.map(option => option.value);
    setData('categories', selectedCategories);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Book</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={data.author}
                  onChange={e => setData('author', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
              </div>

              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                  Categories
                </label>
                <select
                  multiple
                  id="categories"
                  value={data.categories}
                  onChange={handleCategoryChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  size="4"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple categories</p>
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  value={data.genre}
                  onChange={e => setData('genre', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  value={data.price}
                  onChange={e => setData('price', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  value={data.stock}
                  onChange={e => setData('stock', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
              </div>

              <div>
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  value={data.isbn}
                  onChange={e => setData('isbn', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.isbn && <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image (Primary)
                </label>
                <input
                  type="file"
                  id="cover_image"
                  onChange={handleCoverImageChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.cover_image && <p className="mt-1 text-sm text-red-600">{errors.cover_image}</p>}
                {coverImagePreview && (
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Cover Preview</h3>
                    <img
                      src={coverImagePreview}
                      alt="Cover Preview"
                      className="w-48 h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="additional_images" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Images
                </label>
                <input
                  type="file"
                  id="additional_images"
                  onChange={handleAdditionalImagesChange}
                  accept="image/*"
                  multiple
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.additional_images && <p className="mt-1 text-sm text-red-600">{errors.additional_images}</p>}
                
                {additionalImagePreviews.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Image Previews</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {additionalImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {processing ? 'Adding...' : 'Add Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;