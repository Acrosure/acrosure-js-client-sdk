import AcrosureClient from '../src'
import ApplicationManager from '../src/ApplicationManager'

import {
  TEST_PUBLIC_TOKEN,
  TEST_SECRET_TOKEN,
  SUBMIT_APP_DATA,
  CONFIRM_APP_DATA
} from './const'

describe('application with SUBMIT flow', () => {
  let application

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_TOKEN
    })
    application = client.application
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(application).toBeInstanceOf(ApplicationManager)
  })

  it('create application with empty data', async () => {
    const resp = await application.create({
      product_id: SUBMIT_APP_DATA.product_id
    })
    expect(resp.status).toBe('ok')
    const createdApp = resp.data
    expect(createdApp).toBeDefined()
    expect(createdApp.id).toBeDefined()
    expect(createdApp.status).toBe('INITIAL')
  })

  it('get application', async () => {
    const resp = await application.get()
    expect(resp.status).toBe('ok')
    const app = resp.data
    expect(app).toBeDefined()
    expect(app.id).toBe(application.id)
  })

  it('update application with basic data', async () => {
    const resp = await application.update({
      basic_data: SUBMIT_APP_DATA.basic_data
    })
    expect(resp.status).toBe('ok')
    const updatedApp = resp.data
    expect(updatedApp).toBeDefined()
    expect(updatedApp.id).toBeDefined()
    expect(updatedApp.status).toBe('PACKAGE_REQUIRED')
  })

  let packages = []

  it('get packages', async () => {
    const resp = await application.getPackages()
    expect(resp.status).toBe('ok')
    packages = resp.data
    expect(packages).toBeInstanceOf(Array)
    expect(packages.length).toBeGreaterThan(0)
  })

  it('select package', async () => {
    const firstPackage = packages[0]
    const resp = await application.selectPackage({
      package_code: firstPackage.package_code
    })
    expect(resp.status).toBe('ok')
    const updatedApp = resp.data
    expect(updatedApp.status).toBe('DATA_REQUIRED')
  })

  it('get current package', async () => {
    const resp = await application.getPackage()
    expect(resp.status).toBe('ok')
    const currentPackage = resp.data
    expect(currentPackage).toBeInstanceOf(Object)
  })

  it(
    'update application with completed data',
    async () => {
      const resp = await application.update({
        basic_data: SUBMIT_APP_DATA.basic_data,
        package_options: SUBMIT_APP_DATA.package_options,
        additional_data: SUBMIT_APP_DATA.additional_data
      })
      expect(resp.status).toBe('ok')
      const updatedApp = resp.data
      expect(updatedApp).toBeDefined()
      expect(updatedApp.id).toBeDefined()
      expect(updatedApp.status).toBe('READY')
    },
    10000
  )

  it('get 2c2p hash form', async () => {
    const hashForm = await application.get2C2PForm({
      frontend_url: 'https://acrosure.com'
    })
    expect(hashForm).toBeInstanceOf(HTMLFormElement)
  })

  it('submit application', async () => {
    const resp = await application.submit()
    expect(resp.status).toBe('ok')
    const submittedApp = resp.data
    expect(submittedApp).toBeDefined()
    expect(submittedApp.id).toBeDefined()
    expect(submittedApp.status).toBe('SUBMITTED')
  })
})

describe('application with CONFIRM flow', () => {
  let application

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_TOKEN
    })
    application = client.application
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(application).toBeInstanceOf(ApplicationManager)
  })

  it('create application with empty data', async () => {
    const resp = await application.create({
      product_id: CONFIRM_APP_DATA.product_id
    })
    expect(resp.status).toBe('ok')
    const createdApp = resp.data
    expect(createdApp).toBeDefined()
    expect(createdApp.id).toBeDefined()
    expect(createdApp.status).toBe('INITIAL')
  })

  it('get application', async () => {
    const resp = await application.get()
    expect(resp.status).toBe('ok')
    const app = resp.data
    expect(app).toBeDefined()
    expect(app.id).toBe(application.id)
  })

  it('update application with basic data', async () => {
    const resp = await application.update({
      basic_data: CONFIRM_APP_DATA.basic_data
    })
    expect(resp.status).toBe('ok')
    const updatedApp = resp.data
    expect(updatedApp).toBeDefined()
    expect(updatedApp.id).toBeDefined()
    expect(updatedApp.status).toBe('PACKAGE_REQUIRED')
  })

  let packages = []

  it('get packages', async () => {
    const resp = await application.getPackages()
    expect(resp.status).toBe('ok')
    packages = resp.data
    expect(packages).toBeInstanceOf(Array)
    expect(packages.length).toBeGreaterThan(0)
  })

  it('select package', async () => {
    const firstPackage = packages[0]
    const resp = await application.selectPackage({
      package_code: firstPackage.package_code
    })
    expect(resp.status).toBe('ok')
    const updatedApp = resp.data
    expect(updatedApp.status).toBe('DATA_REQUIRED')
  })

  it('get current package', async () => {
    const resp = await application.getPackage()
    expect(resp.status).toBe('ok')
    const currentPackage = resp.data
    expect(currentPackage).toBeInstanceOf(Object)
  })

  it(
    'update application with completed data',
    async () => {
      const resp = await application.update({
        basic_data: CONFIRM_APP_DATA.basic_data,
        package_options: CONFIRM_APP_DATA.package_options,
        additional_data: CONFIRM_APP_DATA.additional_data
      })
      expect(resp.status).toBe('ok')
      const updatedApp = resp.data
      expect(updatedApp).toBeDefined()
      expect(updatedApp.id).toBeDefined()
      expect(updatedApp.status).toBe('READY')
    },
    10000
  )

  it(
    'confirm application',
    async () => {
      const adminClient = new AcrosureClient({
        token: TEST_SECRET_TOKEN,
        application_id: application.id
      })
      const userApplication = adminClient.application
      const resp = await userApplication.confirm()
      expect(resp.status).toBe('error')
      const confirmedApp = resp.data
      expect(confirmedApp).toBeDefined()
      expect(confirmedApp.id).toBeDefined()
      expect(confirmedApp.status).toBe('CONFIRMING')
    },
    30000
  )
})

describe('application remaining endpoints', () => {
  it('list applications', async () => {
    const client = new AcrosureClient({ token: TEST_PUBLIC_TOKEN })
    const resp = await client.application.list()
    expect(resp.status).toBe('ok')
    const applications = resp.data
    expect(applications).toBeInstanceOf(Array)
  })
})
