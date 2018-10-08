import AcrosureClient from '../src'
import DataManager from '../src/DataManager'

import { TEST_PUBLIC_TOKEN } from './const'

const getDataManager = () => {
  const client = new AcrosureClient({
    token: TEST_PUBLIC_TOKEN
  })
  return client.data
}

describe('data endpoints', () => {
  it('create an instance of AcrosureClient', () => {
    const data = getDataManager()
    expect(data).toBeInstanceOf(DataManager)
  })

  it('get data values with no dependencies', async () => {
    const data = getDataManager()
    const values = await data.get({
      handler: 'province'
    })
    expect(values.status).toBe('ok')
    expect(values.data).toBeInstanceOf(Array)
  })

  it('get data values with one dependencies', async () => {
    const data = getDataManager()
    const values = await data.get({
      handler: 'district',
      dependencies: ['กรุงเทพมหานคร']
    })
    expect(values.status).toBe('ok')
    expect(values.data).toBeInstanceOf(Array)
  })

  it('get data values with two dependencies', async () => {
    const data = getDataManager()
    const values = await data.get({
      handler: 'subdistrict',
      dependencies: ['กรุงเทพมหานคร', 'ห้วยขวาง']
    })
    expect(values.status).toBe('ok')
    expect(values.data).toBeInstanceOf(Array)
  })
})
