import AcrosureClient from '../src'
import ProductManager from '../src/ProductManager'

import { TEST_PUBLIC_TOKEN, TEST_API_URL } from './const'

const TEST_PRODUCT_ID = process.env.TEST_PRODUCT_ID

const getProductManager = () => {
  const client = new AcrosureClient({
    token: TEST_PUBLIC_TOKEN,
    apiURL: TEST_API_URL
  })
  return client.product
}

describe('product endpoints', () => {
  it('create an instance of AcrosureClient', () => {
    const product = getProductManager()
    expect(product).toBeInstanceOf(ProductManager)
  })

  it('get product detail', async () => {
    const product = getProductManager()
    const productDetail = await product.get(TEST_PRODUCT_ID)
    expect(productDetail.status).toBe('ok')
    expect(productDetail.data).toBeInstanceOf(Object)
    expect(productDetail.data.id).toBe(TEST_PRODUCT_ID)
  })

  it('list products', async () => {
    const product = getProductManager()
    const products = await product.list()
    expect(products.status).toBe('ok')
    expect(products.data).toBeInstanceOf(Array)
  })
})
