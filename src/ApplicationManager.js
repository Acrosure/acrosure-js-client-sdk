/**
 * @classdesc Represents an ApplicationManager. (You most likely shouldn't be accessing this directly, use {@link AcrosureClient#application} instead.)
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
    /**
     * @member {string}
     * @protected
     * @description Current application status
     */
    this.status = null
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
      const resp = await this.callAPI('/applications/get', {
        application_id: this.id
      })
      if (resp.status) this.status = resp.status
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Get applications list with or without query.
   * @param {Object} args - Query object (See Acrosure API document for more detail).
   * @returns {Array} Applications
   */
  async list(args) {
    try {
      const resp = await this.callAPI('/applications/list', args)
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Create an application and change {@link ApplicationManager#id} if possible.
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.product_id - A product id.
   *   @param {Object=} args.basic_data - Application's basic_data.
   *   @param {Object=} args.package_options - Application's package_options.
   *   @param {Object=} args.additional_data - Application's additional_data.
   *   @param {Array=} args.attachments - A list of files.
   *   @param {string=} args.package_code - A string of package_code.
   *   @param {string=} args.ref1 - A string of reference #1.
   *   @param {string=} args.ref2 - A string of reference #2.
   *   @param {string=} args.ref3 - A string of reference #3.
   *   @param {string=} args.group_policy_id - A string of group policy id.
   *   @param {int=} args.step - A number of current step.
   * @returns {Object} Created application
   */
  async create({
    product_id,
    basic_data,
    package_options,
    additional_data,
    attachments,
    package_code,
    ref1,
    ref2,
    ref3,
    group_policy_id,
    step
  }) {
    try {
      const resp = await this.callAPI('/applications/create', {
        product_id,
        basic_data,
        package_options,
        additional_data,
        attachments,
        package_code,
        ref1,
        ref2,
        ref3,
        group_policy_id,
        step
      })
      if (!resp) throw new Error('no response')
      if (resp.id) this.id = resp.id
      if (resp.status) this.status = resp.status
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Update current application or with specified id.
   * @param {Object} args - An object consists of several properties.
   *   @param {string=} args.application_id - An application id.
   *   @param {Object=} args.basic_data - Application's basic_data.
   *   @param {Object=} args.package_options - Application's package_options.
   *   @param {Object=} args.additional_data - Application's additional_data.
   *   @param {Array=} args.attachments - A list of files.
   *   @param {string=} args.package_code - A string of package_code.
   *   @param {string=} args.ref1 - A string of reference #1.
   *   @param {string=} args.ref2 - A string of reference #2.
   *   @param {string=} args.ref3 - A string of reference #3.
   *   @param {string=} args.group_policy_id - A string of group policy id.
   *   @param {int=} args.step - A number of current step.
   * @returns {Object} Updated application
   */
  async update({
    application_id,
    basic_data,
    package_options,
    additional_data,
    attachments,
    package_code,
    ref1,
    ref2,
    ref3,
    group_policy_id,
    step
  }) {
    try {
      if (application_id) {
        this.id = application_id
      }
      const resp = await this.callAPI('/applications/update', {
        application_id: this.id,
        basic_data,
        package_options,
        additional_data,
        attachments,
        package_code,
        ref1,
        ref2,
        ref3,
        group_policy_id,
        step
      })
      if (resp.status) this.status = resp.status
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
      const resp = await this.callAPI('/applications/get-packages', {
        application_id: this.id
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Get current application's package.
   * @returns {Array} Current application's package
   */
  async getPackage() {
    try {
      const resp = await this.callAPI('/applications/get-package', {
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
   *   @param {string} args.package_code - A string of package_code.
   * @returns {Object} Updated application
   */
  async selectPackage({ package_code }) {
    try {
      const resp = await this.callAPI('/applications/select-package', {
        application_id: this.id,
        package_code: package_code
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
      const resp = await this.callAPI('/applications/submit', {
        application_id: this.id
      })
      if (resp.status) this.status = resp.status
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
      if (resp.status) this.status = resp.status
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default ApplicationManager
