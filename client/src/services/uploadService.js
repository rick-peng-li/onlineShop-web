import request from '@/utils/request'

export const uploadImage = (formData) =>
  request
    .post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data)

export const getPaypalClientId = () =>
  request.get('/api/config/paypal').then((r) => r.data)
