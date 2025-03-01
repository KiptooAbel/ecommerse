// hooks/useWishlist.js
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export const useWishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch wishlist count on mount
  useEffect(() => {
    fetchWishlistCount();
  }, []);
  
  // Fetch wishlist count
  const fetchWishlistCount = async () => {
    try {
      const response = await fetch('/api/wishlist/count');
      const data = await response.json();
      updateWishlistCount(data.count);
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
    }
  };

  // Add to wishlist
  const addToWishlist = (bookId) => {
    setIsLoading(true);
    router.post(route('wishlist.store'), { book_id: bookId }, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsLoading(false);
        addNotification('Item added to wishlist', 'success');
        
        // Update wishlist count
        if (page.props.wishlistCount !== undefined) {
          updateWishlistCount(page.props.wishlistCount);
        } else {
          fetchWishlistCount();
        }
      },
      onError: (errors) => {
        setIsLoading(false);
        const errorMessage = Object.values(errors).flat()[0] || 'Failed to add item to wishlist';
        addNotification(errorMessage, 'error');
      }
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (wishlistId) => {
    setIsLoading(true);
    router.delete(route('wishlist.destroy', wishlistId), {}, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsLoading(false);
        addNotification('Item removed from wishlist', 'success');
        
        // Update wishlist count
        if (page.props.wishlistCount !== undefined) {
          updateWishlistCount(page.props.wishlistCount);
        } else {
          fetchWishlistCount();
        }
      },
      onError: (errors) => {
        setIsLoading(false);
        const errorMessage = Object.values(errors).flat()[0] || 'Failed to remove item from wishlist';
        addNotification(errorMessage, 'error');
      }
    });
  };

  // Move to cart
  const moveToCart = (wishlistId) => {
    setIsLoading(true);
    router.post(route('wishlist.moveToCart', wishlistId), {}, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsLoading(false);
        addNotification('Item moved to cart', 'success');
        
        // Update both wishlist and cart counts
        if (page.props.wishlistCount !== undefined) {
          updateWishlistCount(page.props.wishlistCount);
        } else {
          fetchWishlistCount();
        }
        
        if (page.props.cartCount !== undefined) {
          updateCartCount(page.props.cartCount);
        } else {
          // Assuming you have a similar function in useCart hook
          fetch('/api/cart/count')
            .then(response => response.json())
            .then(data => updateCartCount(data.count))
            .catch(error => console.error('Error fetching cart count:', error));
        }
      },
      onError: (errors) => {
        setIsLoading(false);
        const errorMessage = Object.values(errors).flat()[0] || 'Failed to move item to cart';
        addNotification(errorMessage, 'error');
      }
    });
  };

  return { 
    addToWishlist, 
    removeFromWishlist, 
    moveToCart, 
    isLoading 
  };
};