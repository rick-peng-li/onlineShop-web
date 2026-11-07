import request from '@/utils/request'

export const getProducts = (params) =>
  request.get('/api/products', { params }).then((r) => r.data)

export const getProductById = (id) =>
  request.get(`/api/products/${id}`).then((r) => r.data)

export const getTopProducts = () =>
  request.get('/api/products/top').then((r) => r.data)

export const createProduct = () =>
  request.post('/api/products').then((r) => r.data)

export const updateProduct = (id, data) =>
  request.put(`/api/products/${id}`, data).then((r) => r.data)

export const deleteProduct = (id) =>
  request.delete(`/api/products/${id}`).then((r) => r.data)

export const createProductReview = (id, data) =>
  request.post(`/api/products/${id}/reviews`, data).then((r) => r.data)
