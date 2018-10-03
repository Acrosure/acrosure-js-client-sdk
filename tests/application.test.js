import AcrosureClient from '../src'
import ApplicationManager from '../src/ApplicationManager'

import {
  TEST_PUBLIC_KEY,
  TEST_SECRET_KEY,
  SUBMIT_APP_DATA,
  CONFIRM_APP_DATA
} from './const'

describe('application with SUBMIT flow', () => {
  let application

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_KEY
    })
    application = client.application
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(application).toBeInstanceOf(ApplicationManager)
  })

  it('create application with empty data', async () => {
    const createdApp = await application.create({
      product_id: SUBMIT_APP_DATA.product_id
    })
    expect(createdApp).toBeDefined()
    expect(createdApp.id).toBeDefined()
    expect(createdApp.status).toBe('INITIAL')
  })

  it('get application', async () => {
    const app = await application.get()
    expect(app).toBeDefined()
    expect(app.id).toBe(application.id)
  })

  it('update application with basic data', async () => {
    const updatedApp = await application.update({
      basic_data: SUBMIT_APP_DATA.basic_data
    })
    expect(updatedApp).toBeDefined()
    expect(updatedApp.id).toBeDefined()
    expect(updatedApp.status).toBe('PACKAGE_REQUIRED')
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
      package_code: firstPackage.package_code
    })
    expect(updatedApp.status).toBe('DATA_REQUIRED')
  })

  it('get current package', async () => {
    const currentPackage = await application.getPackage()
    expect(currentPackage).toBeInstanceOf(Object)
  })

  it(
    'update application with completed data',
    async () => {
      const updatedApp = await application.update({
        basic_data: SUBMIT_APP_DATA.basic_data,
        package_options: SUBMIT_APP_DATA.package_options,
        additional_data: SUBMIT_APP_DATA.additional_data
      })
      expect(updatedApp).toBeDefined()
      expect(updatedApp.id).toBeDefined()
      expect(updatedApp.status).toBe('READY')
    },
    10000
  )

  it('submit application', async () => {
    const submittedApp = await application.submit()
    expect(submittedApp).toBeDefined()
    expect(submittedApp.id).toBeDefined()
    expect(submittedApp.status).toBe('SUBMITTED')
  })
})

describe('application with CONFIRM flow', () => {
  let application

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_KEY
    })
    application = client.application
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(application).toBeInstanceOf(ApplicationManager)
  })

  it('create application with empty data', async () => {
    const createdApp = await application.create({
      product_id: CONFIRM_APP_DATA.product_id
    })
    expect(createdApp).toBeDefined()
    expect(createdApp.id).toBeDefined()
    expect(createdApp.status).toBe('INITIAL')
  })

  it('update application with basic data', async () => {
    const updatedApp = await application.update({
      basic_data: CONFIRM_APP_DATA.basic_data
    })
    expect(updatedApp).toBeDefined()
    expect(updatedApp.id).toBeDefined()
    expect(updatedApp.status).toBe('PACKAGE_REQUIRED')
  })

  let packages = []

  it(
    'get packages',
    async () => {
      packages = await application.getPackages()
      expect(packages).toBeInstanceOf(Array)
      expect(packages.length).toBeGreaterThan(0)
    },
    40000
  )

  it('select package', async () => {
    const firstPackage = packages[0]
    const updatedApp = await application.selectPackage({
      package_code: firstPackage.package_code
    })
    expect(updatedApp.status).toBe('DATA_REQUIRED')
  })

  it('get current package', async () => {
    const currentPackage = await application.getPackage()
    expect(currentPackage).toBeInstanceOf(Object)
  })

  it('update application with completed data', async () => {
    const updatedApp = await application.update({
      basic_data: CONFIRM_APP_DATA.basic_data,
      package_options: CONFIRM_APP_DATA.package_options,
      additional_data: CONFIRM_APP_DATA.additional_data
    })
    expect(updatedApp).toBeDefined()
    expect(updatedApp.id).toBeDefined()
    expect(updatedApp.status).toBe('READY')
  })

  it(
    'confirm application',
    async () => {
      const adminClient = new AcrosureClient({
        token: TEST_SECRET_KEY,
        application_id: application.id
      })
      const userApplication = adminClient.application
      const confirmedApp = await userApplication.confirm()
      expect(confirmedApp).toBeDefined()
      expect(confirmedApp.id).toBeDefined()
      expect(confirmedApp.status).toBe('CONFIRMING')
    },
    30000
  )
})

describe('application remaining endpoints', () => {
  it('list applications', async () => {
    const client = new AcrosureClient({ token: TEST_PUBLIC_KEY })
    const applications = await client.application.list()
    expect(applications).toBeInstanceOf(Array)
  })
})
