import ApplicationManager from '../src/ApplicationManager'
import api from '../src/common/api'

import { TEST_PUBLIC_KEY, CONTRACTOR_DATA } from './const'

const callAPI = (path, data) => api(path, data, TEST_PUBLIC_KEY)

let application = null

describe('application with SUBMIT flow', () => {
  it('create an instance of ApplicationManager', () => {
    application = new ApplicationManager({
      callAPI
    })
    expect(application).toBeInstanceOf(ApplicationManager)
  })

  it('create application with empty data', async () => {
    const createdApp = await application.create({
      productId: CONTRACTOR_DATA.productId
    })
    expect(createdApp).toBeDefined()
    expect(createdApp.id).toBeDefined()
    expect(createdApp.status).toBe('INITIAL')
  })

  it('update application with basic data', async () => {
    const updatedApp = await application.update({
      productId: CONTRACTOR_DATA.productId,
      basicData: CONTRACTOR_DATA.basicData
    })
    expect(updatedApp).toBeDefined()
    expect(updatedApp.id).toBeDefined()
    expect(updatedApp.status).toBe('INITIAL')
  })

  let packages = []

  it('get packages', async () => {
    packages = await application.getPackages()
    expect(packages).toBeInstanceOf(Array)
    expect(packages.length).toBeGreaterThan(0)
  })

  it('select package', async () => {
    const firstPackage = packages[0]
    const updatedApp = await application.selectPackage({
      packageCode: firstPackage.package_code
    })
    expect(updatedApp.status).toBe('INITIAL')
  })

  it('update application with completed data', async () => {
    const updatedApp = await application.update({
      basicData: CONTRACTOR_DATA.basicData,
      packageOptions: CONTRACTOR_DATA.packageOptions,
      additionalData: CONTRACTOR_DATA.additionalData
    })
    expect(updatedApp).toBeDefined()
    expect(updatedApp.id).toBeDefined()
    // TODO: change to corresponds with backend
    expect(updatedApp.status).toBe('READY')
  })

  it('submit application', async () => {
    const submittedApp = await application.submit()
    expect(submittedApp).toBeDefined()
    expect(submittedApp.id).toBeDefined()
    // TODO: change to corresponds with backend
    expect(submittedApp.status).toBe('SUBMITTED')
  })
})
