import AcrosureClient from '../src'
import PolicyManager from '../src/PolicyManager'

import { TEST_PUBLIC_TOKEN } from './const'

const TEST_POLICY_ID = process.env.TEST_POLICY_ID

describe('policy endpoints', () => {
  let policy

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_TOKEN
    })
    policy = client.policy
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(policy).toBeInstanceOf(PolicyManager)
  })

  it('get policy detail', async () => {
    const policyDetail = await policy.get(TEST_POLICY_ID)
    expect(policyDetail.status).toBe('ok')
    expect(policyDetail.data).toBeInstanceOf(Object)
    expect(policyDetail.data.id).toBe(TEST_POLICY_ID)
  })

  it('list policies', async () => {
    const policies = await policy.list()
    expect(policies.status).toBe('ok')
    expect(policies.data).toBeInstanceOf(Array)
    expect(policies.pagination).toBeInstanceOf(Object)
  })
})
