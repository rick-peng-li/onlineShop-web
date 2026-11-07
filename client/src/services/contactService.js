import request from '@/utils/request'

export const createContact = (data) =>
  request.post('/api/contacts', data).then((r) => r.data)
