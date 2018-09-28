import 'whatwg-fetch'

const API_URL = 'https://api.phantompage.com'

const api = async (path, body, publicKey) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    if (publicKey) {
      headers.Authorization = `Bearer ${publicKey}`
    }

    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers,
      body
    })
    console.log('>>> publicKey', publicKey)
    const data = await response.data

    if (response.status !== 200 || data.status !== 'ok') {
      throw data
    }
    return data.data
  } catch (err) {
    if (err.response) {
      if (err.response.data) {
        throw err.response.data
      }
      throw err.response
    }
    throw err
  }
}

export default api
