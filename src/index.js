import ApplicationManager from './ApplicationManager'
import ProductManager from './ProductManager'
import api from './common/api'

/**
 * @classdesc Represents an Acrosure API client.
 * @class
 */
class AcrosureClient {
  /**
   * @description Create an AcrosureClient.
   * @constructor
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.publicKey - A public API key.
   *   @param {string=} args.productId - A product id.
   *   @param {string=} args.applicationId - An application id.
   */
  constructor(args) {
    /**
     * @member {string}
     * @description Public API Key
     */
    this.publicKey = args.publicKey
    const callAPI = (path, data) => this.callAPI(path, data)
    /**
     * @member {ApplicationManager}
     * @description ApplicationManager (You should be using this instead of trying to access {@link ApplicationManager} directly)
     */
    this.application = new ApplicationManager({
      id: args.applicationId,
      callAPI
    })
    /**
     * @member {ProductManager}
     * @description ProductManager (You should be using this instead of trying to access {@link ProductManager} directly)
     */
    this.product = new ProductManager({
      id: args.productId,
      callAPI
    })
  }

  /**
   * @function
   * @description Call Acrosure API with corresponding url & current API key.
   * @param {string} path - API path (without domain).
   * @param {Object} data - A data object which is specified by Acrosure.
   */
  callAPI = (path, data) => {
    return api(path, data, this.publicKey)
  }
}

export default AcrosureClient
