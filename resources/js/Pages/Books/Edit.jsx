import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';

const Edit = ({ book, categories }) => {
  // Initialize form with existing categories
  const { data, setData, post, processing, errors } = useForm({
    title: book.title || '',
    author: book.author || '',
    description: book.description || '',
    genre: book.genre || '',
    price: book.price || '',
    stock: book.stock || '',
    isbn: book.isbn || '',
    cover_image: null,
    additional_images: [],
    remove_images: [],
    categories: book.categories?.map(cat => cat.id.toString()) || [],
  });

  // Keep track of image previews
  const [coverImagePreview, setCoverImagePreview] = useState(
    book.images?.find(img => img.is_primary)?.path 
      ? `/storage/${book.images.find(img => img.is_primary)?.path}` 
      : null
  );
  
  // Get additional (non-primary) images from the book
  const additionalImages = book.images?.filter(img => !img.is_primary) || [];
  
  // Track previews for new additional images being uploaded
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('books.update', book.id), {
      onSuccess: () => {
        // Reset file inputs and image removal state after successful submission
        setData('cover_image', null);
        setData('additional_images', []);
        setData('remove_images', []);
        setNewImagePreviews([]);
      },
    });
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('cover_image', file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setData('additional_images', files);
    
    // Generate previews for all selected files
    const previews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        setNewImagePreviews([...previews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (imageId) => {
    const updatedRemoveImages = [...data.remove_images, imageId];
    setData('remove_images', updatedRemoveImages);
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
          <h1 className="text-2xl font-bold mb-6">Edit Book: {book.title}</h1>

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Hidden field for method spoofing */}
            <input type="hidden" name="_method" value="PUT" />
            
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
                    <option key={category.id} value={category.id.toString()}>
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

            {/* Cover Image Section */}
            <div>
              <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              {coverImagePreview && (
                <div className="mb-2">
                  <img
                    src={coverImagePreview}
                    alt="Book cover"
                    className="w-48 h-48 object-cover rounded"
                  />
                  <p className="text-sm text-gray-500 mt-1">Current cover image</p>
                </div>
              )}
              <input
                type="file"
                id="cover_image"
                onChange={handleCoverImageChange}
                accept="image/*"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cover_image && <p className="mt-1 text-sm text-red-600">{errors.cover_image}</p>}
            </div>

            {/* Additional Images Section */}
            <div>
              <label htmlFor="additional_images" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Images
              </label>
              
              {/* Display existing additional images */}
              {additionalImages.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Current Additional Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {additionalImages.map(image => (
                      <div key={image.id} className="relative">
                        {!data.remove_images.includes(image.id) ? (
                          <>
                            <img 
                              src={`/storage/${image.path}`} 
                              alt={image.alt_text} 
                              className="w-full h-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(image.id)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              title="Remove image"
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-32 border border-dashed border-gray-300 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Image marked for removal</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedRemoveImages = data.remove_images.filter(id => id !== image.id);
                                setData('remove_images', updatedRemoveImages);
                              }}
                              className="ml-2 text-blue-500 underline text-sm"
                            >
                              Undo
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Display previews for new images */}
              {newImagePreviews.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">New Images to Upload</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={preview} 
                          alt={`New image ${index + 1}`} 
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* File input for new additional images */}
              <input
                type="file"
                id="additional_images"
                onChange={handleAdditionalImagesChange}
                accept="image/*"
                multiple
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.additional_images && <p className="mt-1 text-sm text-red-600">{errors.additional_images}</p>}
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
                {processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;