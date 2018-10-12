import AcrosureClient from '../src'
import TeamManager from '../src/TeamManager'

import { TEST_PUBLIC_TOKEN, TEST_API_URL } from './const'

const getTeamManager = () => {
  const client = new AcrosureClient({
    token: TEST_PUBLIC_TOKEN,
    apiURL: TEST_API_URL
  })
  return client.team
}

describe('team endpoints', () => {
  it('create an instance of AcrosureClient', () => {
    const team = getTeamManager()
    expect(team).toBeInstanceOf(TeamManager)
  })

  it('get team info', async () => {
    const team = getTeamManager()
    const info = await team.getInfo()
    expect(info.status).toBe('ok')
    expect(info.data).toBeInstanceOf(Object)
  })
})
