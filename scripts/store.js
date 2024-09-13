import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  user: {},
  orders: [],
  coupons: [],
  setUser: (user) => set({ user }),
  setOrders: (orders) => set({ orders }),
  setCoupons: (coupons) => set({ coupons }),
  getCoupons: async () => {
    try {
      const { user } = useStore.getState();
      const response = await axios.get(
        `${user.baseURL}/wp-json/wc/v3/coupons`,
        {
          params: {
            consumer_key: user.consumerKey,
            consumer_secret: user.consumerSecret,
          },
        }
      );
      set({ coupons: response.data });
    } catch (error) {
      console.error('Error fetching coupons:', error.message);
    }
  },
  
}));

export default useStore;
