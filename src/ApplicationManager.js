/**
 * @classdesc Represents an ApplicationManager. (You most likely shouldn't be accessing this directly, instead use {@link AcrosureClient#application} instead.)
 * @class
 */
class ApplicationManager {
  /**
   * @description Create an application manager.
   * @constructor
   * @param {Object} args - An object consists of several properties.
   *   @param {function} args.callAPI - A function which call Acrosure API.
   *   @param {string=} args.id - Current managing application id.
   */
  constructor(args) {
    /**
     * @member {string}
     * @description Application id that is currently in managing.
     */
    this.id = args.id
    /**
     * @member {function}
     * @description callAPI Function (which should be granted by {@link AcrosureClient#callAPI} )
     */
    this.callAPI = args.callAPI
  }

  /**
   * @function
   * @description Set current application id.
   * @param {Object} id - An application id.
   */
  setID(id) {
    this.id = id
  }

  /**
   * @function
   * @description Get an application with specify id or with current id.
   * @param {string=} id - An application id.
   * @returns {Object} An application
   */
  async get(id) {
    try {
      if (id) this.id = id
      const resp = await this.callAPI('/web/applications/get', {
        application_id: this.id
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Create an application and change {@link ApplicationManager#id} if possible.
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.productId - A product id.
   *   @param {Object=} args.basicData - basic_data
   *   @param {Object=} args.packageOptions - package_options
   *   @param {Object=} args.additionalData - additional_data
   *   @param {Array=} args.attachments - A list of files.
   *   @param {string=} args.packageCode - A string of package_code.
   * @returns {Object} Created application
   */
  async create({
    productId,
    basicData,
    packageOptions,
    additionalData,
    attachments,
    packageCode
  }) {
    try {
      const resp = await this.callAPI('/web/applications/create', {
        product_id: productId,
        basic_data: basicData,
        package_options: packageOptions,
        additional_data: additionalData,
        attachments,
        package_code: packageCode
      })
      if (resp.id) {
        this.id = resp.id
      }
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Update an application.
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.productId - A product id.
   *   @param {Object=} args.basicData - basic_data
   *   @param {Object=} args.packageOptions - package_options
   *   @param {Object=} args.additionalData - additional_data
   *   @param {Array=} args.attachments - A list of files.
   *   @param {string=} args.packageCode - A string of package_code.
   * @returns {Object} Created application
   */
  async update({
    productId,
    basicData,
    packageOptions,
    additionalData,
    attachments,
    packageCode
  }) {
    try {
      const resp = await this.callAPI('/web/applications/update', {
        application_id: this.id,
        product_id: productId,
        basic_data: basicData,
        package_options: packageOptions,
        additional_data: additionalData,
        attachments,
        package_code: packageCode
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Get available packages for current application.
   * @returns {Array} Available packages
   */
  async getPackages() {
    try {
      const resp = await this.callAPI('/web/applications/get-packages', {
        application_id: this.id
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Select package for current application.
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.packageCode - A string of package_code.
   * @returns {Object} Updated application
   */
  async selectPackage({ packageCode }) {
    try {
      // TODO: change to /select-package when backend is done
      const resp = await this.callAPI('/web/applications/update', {
        application_id: this.id,
        package_code: packageCode
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Submit current application.
   * @returns {Object} Submitted application
   */
  async submit() {
    try {
      const resp = await this.callAPI('/web/applications/submit', {
        application_id: this.id
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Confirm current application.
   * @returns {Object} Confirmed application
   */
  async confirm() {
    try {
      const resp = await this.callAPI('/applications/confirm', {
        application_id: this.id
      })
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default ApplicationManager
