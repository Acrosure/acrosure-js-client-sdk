import 'whatwg-fetch'

// const API_URL = 'https://api.phantompage.com'
const API_URL = 'http://localhost:8000'

const api = async (path, body, publicKey) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (publicKey) {
      headers.Authorization = `Bearer ${publicKey}`
    }
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    if (!response) {
      throw new Error('no response')
    }
    const data = await response.json()
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
