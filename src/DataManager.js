/**
 * @classdesc Represents an DataManager. (You most likely shouldn't be accessing this directly, use {@link AcrosureClient#data} instead.)
 * @class
 */
class DataManager {
  /**
   * @description Create an data manager.
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
   * @description Get data of a handler.
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.handler - A handler string.
   *   @param {Array} args.dependencies - An array of dependencies (if needed).
   * @returns {Object} Available values for the combination of handler/dependencies.
   */
  async get({ handler, dependencies }) {
    try {
      const resp = await this.callAPI('/data/get', {
        handler,
        dependencies
      })
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default DataManager
