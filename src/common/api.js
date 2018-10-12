import 'isomorphic-fetch'

const API_URL = 'https://api.acrosure.com'

const api = async (path, body, token, apiURL) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const targetAPI = apiURL || API_URL
    const response = await fetch(`${targetAPI}${path}`, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : '{}'
    })
    if (!response) {
      throw new Error('no response')
    }
    const data = await response.json()
    if (data.status !== 'ok') {
      console.warn(data)
    }
    return data
  } catch (err) {
    console.warn(err)
    if (err.message) {
      throw err
    }
    if (err && err.response) {
      if (err.response.data) {
        throw err.response.data
      }
      throw err.response
    }
    throw err
  }
}

export default api
