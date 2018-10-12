import AcrosureClient from '../src'
import PolicyManager from '../src/PolicyManager'

import { TEST_PUBLIC_TOKEN, TEST_API_URL } from './const'

const TEST_POLICY_ID = process.env.TEST_POLICY_ID

const getPolicyManager = () => {
  const client = new AcrosureClient({
    token: TEST_PUBLIC_TOKEN,
    apiURL: TEST_API_URL
  })
  return client.policy
}

describe('policy endpoints', () => {
  it('create an instance of AcrosureClient', () => {
    const policy = getPolicyManager()
    expect(policy).toBeInstanceOf(PolicyManager)
  })

  it('get policy detail', async () => {
    const policy = getPolicyManager()
    const policyDetail = await policy.get(TEST_POLICY_ID)
    expect(policyDetail.status).toBe('ok')
    expect(policyDetail.data).toBeInstanceOf(Object)
    expect(policyDetail.data.id).toBe(TEST_POLICY_ID)
  })

  it('list policies', async () => {
    const policy = getPolicyManager()
    const policies = await policy.list()
    expect(policies.status).toBe('ok')
    expect(policies.data).toBeInstanceOf(Array)
    expect(policies.pagination).toBeInstanceOf(Object)
  })
})
