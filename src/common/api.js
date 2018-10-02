import 'whatwg-fetch'

// const API_URL = 'https://api.phantompage.com'
const API_URL = 'http://localhost:8000'

const api = async (path, body, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : '{}'
    })
    if (!response) {
      throw new Error('no response')
    }
    const data = await response.json()
    if (data.status !== 'ok') {
      throw data
    }
    return data.data
  } catch (err) {
    console.warn(err)
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
