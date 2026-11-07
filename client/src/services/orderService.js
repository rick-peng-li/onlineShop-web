import request from '@/utils/request'

export const createOrder = (data) =>
  request.post('/api/orders', data).then((r) => r.data)

export const getOrderById = (id) =>
  request.get(`/api/orders/${id}`).then((r) => r.data)

export const payOrder = (id, paymentResult) =>
  request.put(`/api/orders/${id}/pay`, paymentResult).then((r) => r.data)

export const deliverOrder = (id) =>
  request.put(`/api/orders/${id}/deliver`).then((r) => r.data)

export const getMyOrders = () =>
  request.get('/api/orders/myorders').then((r) => r.data)

export const getOrders = () =>
  request.get('/api/orders').then((r) => r.data)
