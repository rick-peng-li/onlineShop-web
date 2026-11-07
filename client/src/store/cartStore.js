import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      shippingAddress: {},
      paymentMethod: '',

      addToCart: (product, qty = 1) => {
        const existing = get().cartItems.find((i) => i.product === product._id)
        let items
        if (existing) {
          items = get().cartItems.map((i) =>
            i.product === product._id ? { ...i, qty: i.qty + qty } : i
          )
        } else {
          items = [
            ...get().cartItems,
            {
              product: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              countInStock: product.countInStock,
              qty,
            },
          ]
        }
        set({ cartItems: items })
      },

      updateQty: (id, qty) =>
        set({
          cartItems: get().cartItems.map((i) =>
            i.product === id ? { ...i, qty } : i
          ),
        }),

      removeFromCart: (id) =>
        set({
          cartItems: get().cartItems.filter((i) => i.product !== id),
        }),

      clearCart: () => set({ cartItems: [] }),

      saveShippingAddress: (data) => set({ shippingAddress: data }),
      savePaymentMethod: (method) => set({ paymentMethod: method }),
    }),
    { name: 'cart' }
  )
)

export default useCartStore
