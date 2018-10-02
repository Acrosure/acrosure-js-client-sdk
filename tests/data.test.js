import AcrosureClient from '../src'
import DataManager from '../src/DataManager'

import { TEST_PUBLIC_KEY } from './const'

describe('data endpoints', () => {
  let data

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_KEY
    })
    data = client.data
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(data).toBeInstanceOf(DataManager)
  })

  it('get data values with no dependencies', async () => {
    const values = await data.get({
      handler: 'province'
    })
    expect(values).toBeInstanceOf(Array)
  })

  it('get data values with one dependencies', async () => {
    const values = await data.get({
      handler: 'district',
      dependencies: ['กรุงเทพมหานคร']
    })
    expect(values).toBeInstanceOf(Array)
  })

  it('get data values with two dependencies', async () => {
    const values = await data.get({
      handler: 'subdistrict',
      dependencies: ['กรุงเทพมหานคร', 'ห้วยขวาง']
    })
    expect(values).toBeInstanceOf(Array)
  })
})
