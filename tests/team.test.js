import AcrosureClient from '../src'
import TeamManager from '../src/TeamManager'

import { TEST_PUBLIC_TOKEN } from './const'

describe('team endpoints', () => {
  let team

  it('create an instance of AcrosureClient', () => {
    const client = new AcrosureClient({
      token: TEST_PUBLIC_TOKEN
    })
    team = client.team
    expect(client).toBeInstanceOf(AcrosureClient)
    expect(team).toBeInstanceOf(TeamManager)
  })

  it('get team info', async () => {
    const info = await team.getInfo()
    expect(info.status).toBe('ok')
    expect(info.data).toBeInstanceOf(Object)
  })
})
