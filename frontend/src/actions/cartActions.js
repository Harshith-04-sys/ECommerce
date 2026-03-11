/**
 * cartActions.js
 * - Handles adding items to cart by fetching product details from backend
 * - Updates Redux state and localStorage
 * - Provides remove and clear cart functionality
 */
import { addCartItemRequest, addCartItemSuccess, addCartItemFail } from '../slices/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Add item to cart
 * @param {string} id - Product ID
 * @param {number} quantity - Quantity to add
 */
export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());
        
        const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/${id}`);
        
        if (!data.success || !data.product) {
            throw new Error('Product not found');
        }
        
        const cartItem = {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images && data.product.images.length > 0 
                ? (data.product.images[0].image || data.product.images[0].url)
                : '/images/default_product.png',
            stock: data.product.stock,
            quantity
        };
        
        dispatch(addCartItemSuccess(cartItem));
        
        toast('Cart Item Added!', {
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add item to cart';
        dispatch(addCartItemFail(errorMessage));
        
        toast(errorMessage, {
            type: 'error',
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
};