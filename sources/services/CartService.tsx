import ApiContants from '../constants/ApiContants';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const getCartItems = async () => {
  console.log(`CartService | getCartItems`);
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CART}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Cart data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Cart data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Cart data not found`,
    };
  }
};

const addToCart = async ({ foodId }: { foodId: string }) => {
  console.log(`CartService | addToCart`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CART}/${foodId}`,
      {},
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added to cart failed`,
      };
    }
  } catch (error) {
    console.log((error as AxiosError).response); // Access response safely
    return {
      status: false,
      message: `Item added to cart failed`,
    };
  }
};

const removeFromCart = async ({ foodId }: { foodId: string }) => {
  console.log(`CartService | removeFromCart`);
  try {
    let response = await axios.delete(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CART}/${foodId}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item removed from cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item removed from failed`,
      };
    }
  } catch (error: any) { // Specify the type of error to any or AxiosError
    return {
      status: false,
      message: `Item removed from failed`,
    };
  }
};

export default { getCartItems, addToCart, removeFromCart };
