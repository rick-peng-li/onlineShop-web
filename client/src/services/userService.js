import request from '@/utils/request'

export const login = (email, password) =>
  request.post('/api/users/login', { email, password }).then((r) => r.data)

export const register = (name, email, password) =>
  request
    .post('/api/users', { name, email, password })
    .then((r) => r.data)

export const getProfile = () =>
  request.get('/api/users/profile').then((r) => r.data)

export const updateProfile = (data) =>
  request.put('/api/users/profile', data).then((r) => r.data)

export const getUsers = () =>
  request.get('/api/users').then((r) => r.data)

export const getUserById = (id) =>
  request.get(`/api/users/${id}`).then((r) => r.data)

export const updateUser = (id, data) =>
  request.put(`/api/users/${id}`, data).then((r) => r.data)

export const deleteUser = (id) =>
  request.delete(`/api/users/${id}`).then((r) => r.data)
