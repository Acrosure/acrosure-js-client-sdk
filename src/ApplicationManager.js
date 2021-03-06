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
   * @description Get an application with specify id or with current id.
   * @param {string} id - An application id.
   * @returns {Object} An application
   */
  async get(id) {
    try {
      const resp = await this.callAPI('/applications/get', {
        application_id: id
      })
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
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Update current application or with specified id.
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.application_id - An application id.
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
      const resp = await this.callAPI('/applications/update', {
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
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Get available packages for current application.
   * @param {string} id - An application id.
   * @returns {Array} Available packages
   */
  async getPackages(id) {
    try {
      const resp = await this.callAPI('/applications/get-packages', {
        application_id: id
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Get current application's package.
   * @param {string} id - An application id.
   * @returns {Array} Current application's package
   */
  async getPackage(id) {
    try {
      const resp = await this.callAPI('/applications/get-package', {
        application_id: id
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
   *   @param {string} args.application_id - An application id.
   *   @param {string} args.package_code - A string of package_code.
   * @returns {Object} Updated application
   */
  async selectPackage({ application_id, package_code }) {
    try {
      const resp = await this.callAPI('/applications/select-package', {
        application_id: application_id,
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
   * @param {string} id - An application id.
   * @returns {Object} Submitted application
   */
  async submit(id) {
    try {
      const resp = await this.callAPI('/applications/submit', {
        application_id: id
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Confirm current application.
   * @param {string} id - An application id.
   * @returns {Object} Confirmed application
   */
  async confirm(id) {
    try {
      const resp = await this.callAPI('/applications/confirm', {
        application_id: id
      })
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Redirect to current application's payment page (Browser only).
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.application_id - An application id.
   *   @param {string} args.frontend_url - A string of redirect frontend URL.
   */
  async redirectToPayment(args) {
    try {
      const form = await this.get2C2PForm(args)
      form.submit()
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @protected
   * @description Get form element for 2c2p payment (This is being called by {@link ApplicationManager#redirectToPayment}, but it is exposed just in case you need to access the generated form directly).
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.application_id - An application id.
   *   @param {string} args.frontend_url - A string of redirect frontend URL.
   * @returns {Object} An form element
   */
  async get2C2PForm(args) {
    try {
      const resp = await this.get2C2PHash(args)
      if (resp.status === 'error') throw new Error('get hash error')
      if (!document) throw new Error('no document defined')
      const form = document.createElement('form')
      const hashForm = resp.data || {}
      form.method = 'POST'
      form.action = hashForm.payment_url
      Object.keys(hashForm).forEach(key => {
        if (key === 'payment_url') return
        const val = hashForm[key]
        const el = document.createElement('input')
        el.value = val
        el.name = key
        el.type = 'hidden'
        form.appendChild(el)
      })
      return form
    } catch (err) {
      throw err
    }
  }

  async get2C2PHash({ application_id, frontend_url }) {
    try {
      const resp = await this.callAPI('/payments/2c2p/get-hash', {
        application_id,
        frontend_url
      })
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default ApplicationManager
