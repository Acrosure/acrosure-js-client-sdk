import AcrosureClient from '../src'
import ProductManager from '../src/ProductManager'

import { TEST_PUBLIC_TOKEN } from './const'

const TEST_PRODUCT_ID = process.env.TEST_PRODUCT_ID

describe('product endpoints', () => {
  let product

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_TOKEN
    })
    product = client.product
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(product).toBeInstanceOf(ProductManager)
  })

  it('get product detail', async () => {
    const productDetail = await product.get(TEST_PRODUCT_ID)
    expect(productDetail.status).toBe('ok')
    expect(productDetail.data).toBeInstanceOf(Object)
    expect(productDetail.data.id).toBe(TEST_PRODUCT_ID)
  })

  it('list products', async () => {
    const products = await product.list()
    expect(products.status).toBe('ok')
    expect(products.data).toBeInstanceOf(Array)
  })
})
