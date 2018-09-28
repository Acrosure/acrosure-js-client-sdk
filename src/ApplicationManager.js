import 'whatwg-fetch'

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
   * @description Create an application.
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.productId - A product id.
   *   @param {Object=} args.basicData - basic_data
   *   @param {Object=} args.packageOptions - package_options
   *   @param {Object=} args.additionalData - additional_data
   *   @param {Array=} args.attachments - A list of files.
   *   @param {string=} args.packageCode - A string of package_code.
   */
  create = async ({
    productId,
    basicData,
    packageOptions,
    additionalData,
    attachments,
    packageCode
  }) => {
    if (productId) {
      this.productId = productId
    }
    return await this.callAPI('/applications/create', {
      product_id: productId,
      basic_data: basicData,
      package_options: packageOptions,
      additional_data: additionalData,
      attachments,
      package_code: packageCode
    })
  }
}

export default ApplicationManager
