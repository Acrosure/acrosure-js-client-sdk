import 'whatwg-fetch'
require('dotenv').config()

const API_URL = process.env.TEST_API_URL || 'https://api.acrosure.com'

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
