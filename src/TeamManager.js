/**
 * @classdesc Represents an TeamManager. (You most likely shouldn't be accessing this directly, use {@link AcrosureClient#team} instead.)
 * @class
 */
class TeamManager {
  /**
   * @description Create a team manager.
   * @constructor
   * @param {Object} args - An object consists of several properties.
   *   @param {function} args.callAPI - A function which call Acrosure API.
   */
  constructor(args) {
    /**
     * @member {function}
     * @description callAPI Function (which should be granted by {@link AcrosureClient#callAPI} )
     */
    this.callAPI = args.callAPI
  }

  /**
   * @function
   * @description Get current team info.
   * @returns {Object} Current team info.
   */
  async getInfo() {
    try {
      const resp = await this.callAPI('/teams/get-info')
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default TeamManager
