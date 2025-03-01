// hooks/useCart.js
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch cart count on mount - this assumes you have an API endpoint that returns the cart count
  useEffect(() => {
    fetchCartCount();
  }, []);
  
  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart/count');
      const data = await response.json();
      updateCartCount(data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  // Add to cart
  const addToCart = (bookId, quantity = 1) => {
    setIsLoading(true);
    
    // Prevent page jump by using Inertia's preserveScroll option
    router.post(route('cart.store'), { book_id: bookId, quantity }, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsLoading(false);
        addNotification('Item added to cart successfully', 'success');
        
        // Update cart count
        if (page.props.cartCount !== undefined) {
          updateCartCount(page.props.cartCount);
        } else {
          fetchCartCount();
        }
      },
      onError: (errors) => {
        setIsLoading(false);
        const errorMessage = Object.values(errors).flat()[0] || 'Failed to add item to cart';
        addNotification(errorMessage, 'error');
      }
    });
  };

  // Remove from cart
  const removeFromCart = (cartId) => {
    setIsLoading(true);
    router.delete(route('cart.destroy', cartId), {}, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsLoading(false);
        addNotification('Item removed from cart', 'success');
        
        // Update cart count
        if (page.props.cartCount !== undefined) {
          updateCartCount(page.props.cartCount);
        } else {
          fetchCartCount();
        }
      },
      onError: (errors) => {
        setIsLoading(false);
        const errorMessage = Object.values(errors).flat()[0] || 'Failed to remove item from cart';
        addNotification(errorMessage, 'error');
      }
    });
  };

  // Update quantity
  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) return;
    
    setIsLoading(true);
    router.post(route('cart.store'), { book_id: bookId, quantity }, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsLoading(false);
        addNotification('Cart updated successfully', 'success');
        
        // Update cart count - not needed for quantity change but included for consistency
        if (page.props.cartCount !== undefined) {
          updateCartCount(page.props.cartCount);
        }
      },
      onError: (errors) => {
        setIsLoading(false);
        const errorMessage = Object.values(errors).flat()[0] || 'Failed to update cart';
        addNotification(errorMessage, 'error');
      }
    });
  };

  return { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    isLoading 
  };
};