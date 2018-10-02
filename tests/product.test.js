import AcrosureClient from '../src'
import ProductManager from '../src/ProductManager'

import { TEST_PUBLIC_KEY, TEST_SECRET_KEY } from './const'

const TEST_PRODUCT_ID = 'prod_contractor'

describe('product endpoints', () => {
  let product

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_KEY
    })
    product = client.product
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(product).toBeInstanceOf(ProductManager)
  })

  it('get product detail', async () => {
    const productDetail = await product.get(TEST_PRODUCT_ID)
    expect(productDetail).toBeInstanceOf(Object)
    expect(productDetail.id).toBe(TEST_PRODUCT_ID)
  })

  it('list products', async () => {
    const products = await product.list()
    expect(products).toBeInstanceOf(Array)
  })
})
