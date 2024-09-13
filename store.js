import {create} from 'zustand';
import axios from 'axios';
import {Alert} from 'react-native';

const useStore = create((set, get) => ({
  user: {},
  orders: [],
  coupons: [],
  reservations: [],

  setUser: user => set({user}),
  setOrders: orders => set({orders}),
  setCoupons: coupons => set({coupons}),

  getOrders: async (page=1 , perPage=10) => {
    const { user } = get();
    try {
      const response = await axios.get(`${user.baseURL}/wp-json/wc/v3/orders`, {
        params: {
          consumer_key: user.consumerKey,
          consumer_secret: user.consumerSecret,
          page: page,
          per_page: perPage,
        },
      });
      const currentOrders = get().orders;
      const newOrders = page === 1 ? response.data : [...currentOrders, ...response.data];
      set({ orders: newOrders });
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  },
  

  updateOrderStatus: async (id, status) => {
    const {user} = get();
    try {
      await axios.put(
        `${user.baseURL}/wp-json/wc/v3/orders/${id}`,
        {status},
        {
          params: {
            consumer_key: user.consumerKey,
            consumer_secret: user.consumerSecret,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Order status updated successfully.');
    } catch (error) {
      console.error(
        'Failed to update order status:',
        error.response?.data || error.message,
      );
    }
  },

  getCoupons: async () => {
    const {user} = get();
    try {
      const response = await axios.get(
        `${user.baseURL}/wp-json/wc/v3/coupons`,
        {
          params: {
            consumer_key: user.consumerKey,
            consumer_secret: user.consumerSecret,
          },
        },
      );
      set({coupons: response.data});
    } catch (error) {
      console.error('Error fetching coupons:', error.message);
    }
  },

  deleteCoupon: async id => {
    const {user, getCoupons} = get();
    try {
      await axios.delete(`${user.baseURL}/wp-json/wc/v3/coupons/${id}`, {
        params: {
          consumer_key: user.consumerKey,
          consumer_secret: user.consumerSecret,
        },
      });
      Alert.alert('Success', 'Coupon deleted successfully');
      await getCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error.message);
    }
  },

  addCoupon: async (couponCode, discountType, amount) => {
    const {user, getCoupons} = get();
    try {
      const newCoupon = {code: couponCode, discount_type: discountType, amount};
      await axios.post(`${user.baseURL}/wp-json/wc/v3/coupons`, newCoupon, {
        params: {
          consumer_key: user.consumerKey,
          consumer_secret: user.consumerSecret,
        },
      });
      await getCoupons();
    } catch (error) {
      console.error('Error adding coupon:', error.message);
    }
  },

  getReservations: async () => {
    const {user} = get();
    try {
      const response = await axios.get(
        `${user.baseURL}/wp-json/wc-rms/v1/reservation`,
        {
          auth: {
            username: user.username,
            password: user.password,
          },
        },
      );
      set({reservations: response.data});
      console.log('Reservations fetched');
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
    }
  },

  updateReservation: async (id, newStatus) => {
    const {user} = get();
    try {
      console.log(
        `Updating reservation with ID: ${id} to status: ${newStatus}`,
      );
      const response = await axios.patch(
        `${user.baseURL}/wp-json/wc-rms/v1/reservation/${id}`,
        {reservation_status: newStatus},
        {
          auth: {
            username: user.username,
            password: user.password,
          },
        },
      );
      set({reservations: response.data});
      console.log('Reservation updated successfully');
    } catch (error) {
      console.error(
        'Error updating reservation:',
        error.response?.data || error.message,
      );
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      }
    }
  },
}));

export default useStore;
