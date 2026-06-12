const COUNTRIES_API_URL = '/api/countries/v5?response_fields=names.common,codes.alpha_2&limit=100'

export const getCountries = async () => {
  const response = await fetch(COUNTRIES_API_URL, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch countries')
  }

  const payload = await response.json()
  const countries = payload?.data?.objects || []

  return [...countries]
    .map((country) => ({
      name: country?.names?.common || '',
      code: country?.codes?.alpha_2 || '',
    }))
    .filter((country) => country.name && country.code)
    .sort((a, b) => a.name.localeCompare(b.name))
}
