import AcrosureClient from '../src'
import ApplicationManager from '../src/ApplicationManager'

import {
  TEST_PUBLIC_TOKEN,
  TEST_SECRET_TOKEN,
  TEST_API_URL,
  SUBMIT_APP_DATA,
  CONFIRM_APP_DATA
} from './const'

const getApplicationManager = token => {
  const client = new AcrosureClient({
    token: token || TEST_PUBLIC_TOKEN,
    apiURL: TEST_API_URL
  })
  return client.application
}

describe('application with SUBMIT flow', () => {
  let applicationId

  it('create an instance of AcrosureClient', () => {
    const application = getApplicationManager()
    expect(application).toBeInstanceOf(ApplicationManager)
  })

  it('create application with empty data', async () => {
    const application = getApplicationManager()
    const resp = await application.create({
      product_id: SUBMIT_APP_DATA.product_id
    })
    expect(resp.status).toBe('ok')
    const createdApp = resp.data
    expect(createdApp).toBeDefined()
    expect(createdApp.id).toBeDefined()
    applicationId = createdApp.id
    expect(createdApp.status).toBe('INITIAL')
  })

  it('get application', async () => {
    const application = getApplicationManager()
    const resp = await application.get(applicationId)
    expect(resp.status).toBe('ok')
    const app = resp.data
    expect(app).toBeDefined()
    expect(app.id).toBe(applicationId)
  })

  it('update application with basic data', async () => {
    const application = getApplicationManager()
    const resp = await application.update({
      application_id: applicationId,
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
    const application = getApplicationManager()
    const resp = await application.getPackages(applicationId)
    expect(resp.status).toBe('ok')
    packages = resp.data
    expect(packages).toBeInstanceOf(Array)
    expect(packages.length).toBeGreaterThan(0)
  })

  it('select package', async () => {
    const application = getApplicationManager()
    const firstPackage = packages[0]
    const resp = await application.selectPackage({
      application_id: applicationId,
      package_code: firstPackage.package_code
    })
    expect(resp.status).toBe('ok')
    const updatedApp = resp.data
    expect(updatedApp.status).toBe('DATA_REQUIRED')
  })

  it('get current package', async () => {
    const application = getApplicationManager()
    const resp = await application.getPackage(applicationId)
    expect(resp.status).toBe('ok')
    const currentPackage = resp.data
    expect(currentPackage).toBeInstanceOf(Object)
  })

  it(
    'update application with completed data',
    async () => {
      const application = getApplicationManager()
      const resp = await application.update({
        application_id: applicationId,
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
    const application = getApplicationManager()
    const hashForm = await application.get2C2PForm({
      application_id: applicationId,
      frontend_url: 'https://acrosure.com'
    })
    expect(hashForm).toBeInstanceOf(HTMLFormElement)
  })

  it('submit application', async () => {
    const application = getApplicationManager()
    const resp = await application.submit(applicationId)
    expect(resp.status).toBe('ok')
    const submittedApp = resp.data
    expect(submittedApp).toBeDefined()
    expect(submittedApp.id).toBeDefined()
    expect(submittedApp.status).toBe('SUBMITTED')
  })
})

describe('application with CONFIRM flow', () => {
  let applicationId

  it('create an instance of AcrosureClient', () => {
    const application = getApplicationManager()
    expect(application).toBeInstanceOf(ApplicationManager)
  })

  it('create application with empty data', async () => {
    const application = getApplicationManager()
    const resp = await application.create({
      product_id: CONFIRM_APP_DATA.product_id
    })
    expect(resp.status).toBe('ok')
    const createdApp = resp.data
    expect(createdApp).toBeDefined()
    expect(createdApp.id).toBeDefined()
    applicationId = createdApp.id
    expect(createdApp.status).toBe('INITIAL')
  })

  it('get application', async () => {
    const application = getApplicationManager()
    const resp = await application.get(applicationId)
    expect(resp.status).toBe('ok')
    const app = resp.data
    expect(app).toBeDefined()
    expect(app.id).toBe(applicationId)
  })

  it('update application with basic data', async () => {
    const application = getApplicationManager()
    const resp = await application.update({
      application_id: applicationId,
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
    const application = getApplicationManager()
    const resp = await application.getPackages(applicationId)
    expect(resp.status).toBe('ok')
    packages = resp.data
    expect(packages).toBeInstanceOf(Array)
    expect(packages.length).toBeGreaterThan(0)
  })

  it('select package', async () => {
    const application = getApplicationManager()
    const firstPackage = packages[0]
    const resp = await application.selectPackage({
      application_id: applicationId,
      package_code: firstPackage.package_code
    })
    expect(resp.status).toBe('ok')
    const updatedApp = resp.data
    expect(updatedApp.status).toBe('DATA_REQUIRED')
  })

  it('get current package', async () => {
    const application = getApplicationManager()
    const resp = await application.getPackage(applicationId)
    expect(resp.status).toBe('ok')
    const currentPackage = resp.data
    expect(currentPackage).toBeInstanceOf(Object)
  })

  it(
    'update application with completed data',
    async () => {
      const application = getApplicationManager()
      const resp = await application.update({
        application_id: applicationId,
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
      const application = getApplicationManager(TEST_SECRET_TOKEN)
      const resp = await application.confirm(applicationId)
      const policies = resp.data
      expect(policies.length).toBeGreaterThan(0)
      expect(policies[0].id).toBeDefined()
      expect(policies[0].application_id).toBe(applicationId)
    },
    30000
  )
})

describe('application remaining endpoints', () => {
  it('list applications', async () => {
    const application = getApplicationManager()
    const resp = await application.list()
    expect(resp.status).toBe('ok')
    const applications = resp.data
    expect(applications).toBeInstanceOf(Array)
  })
})
