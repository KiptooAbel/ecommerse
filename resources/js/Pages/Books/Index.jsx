import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';


const Index = ({ books }) => {
  return (
    <AuthenticatedLayout>

    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books Management</h1>
        <Link
          href={route('books.create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              {book.cover_image && (
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2">By {book.author}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">${book.price}</span>
                <span className="text-sm text-gray-500">Stock: {book.stock}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{book.genre}</p>
              
              <div className="flex justify-between mt-4">
                <Link
                  href={route('books.edit', book.id)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </Link>
                
                <Link
                  href={route('books.destroy', book.id)}
                  method="delete"
                  as="button"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>        </AuthenticatedLayout>

  );
};

export default Index;