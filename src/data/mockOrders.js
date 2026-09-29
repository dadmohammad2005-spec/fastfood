export const INITIAL_ORDERS = [
  {
    id: 'ORD-9824',
    date: '2026-09-27 21:15',
    items: [
      { id: 'zinger-burger', name: 'Zinger Burger', quantity: 2, price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80' },
      { id: 'french-fries', name: 'Golden French Fries', quantity: 1, price: 3.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=200&q=80' },
      { id: 'soft-drinks', name: 'Ice-Cold Soft Drinks', quantity: 2, price: 2.49, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80' }
    ],
    status: 'Pending', // Pending, Preparing, Out for Delivery, Completed, Cancelled
    statusColor: 'amber',
    totalAmount: 26.95,
    paymentMethod: 'Credit Card (**** 4242)',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, New York, NY'
  },
  {
    id: 'ORD-9751',
    date: '2026-09-25 19:40',
    items: [
      { id: 'supreme-pizza', name: 'Supreme Cheese Pizza', quantity: 1, price: 14.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80' },
      { id: 'chicken-wings', name: 'Buffalo Chicken Wings', quantity: 1, price: 9.99, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=200&q=80' }
    ],
    status: 'Completed',
    statusColor: 'emerald',
    totalAmount: 24.98,
    paymentMethod: 'Cash on Delivery',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, New York, NY'
  },
  {
    id: 'ORD-9610',
    date: '2026-09-21 13:20',
    items: [
      { id: 'shawarma', name: 'Chicken Shawarma Wrap', quantity: 2, price: 8.49, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=200&q=80' },
      { id: 'chocolate-shake', name: 'Thick Chocolate Fudge Milkshake', quantity: 1, price: 4.49, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=200&q=80' }
    ],
    status: 'Completed',
    statusColor: 'emerald',
    totalAmount: 21.47,
    paymentMethod: 'Apple Pay',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, New York, NY'
  },
  {
    id: 'ORD-9402',
    date: '2026-09-14 20:05',
    items: [
      { id: 'bbq-bacon-burger', name: 'Smoky BBQ Monster Burger', quantity: 1, price: 10.99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80' },
      { id: 'loaded-fries', name: 'Cheesy Bacon Loaded Fries', quantity: 1, price: 6.99, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=200&q=80' }
    ],
    status: 'Completed',
    statusColor: 'emerald',
    totalAmount: 17.98,
    paymentMethod: 'Credit Card (**** 4242)',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, New York, NY'
  }
];
