export const formatPrice = (value) =>
  `$${Number(value || 0).toFixed(2)}`

export const formatDate = (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-US')
}
