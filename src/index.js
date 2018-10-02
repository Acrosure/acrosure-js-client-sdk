import ApplicationManager from './ApplicationManager'
import ProductManager from './ProductManager'
import PolicyManager from './PolicyManager'
import DataManager from './DataManager'

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
   *   @param {string} args.token - An access token.
   *   @param {string=} args.productId - A product id.
   *   @param {string=} args.applicationId - An application id.
   */
  constructor(args) {
    /**
     * @member {string}
     * @description Access token (or API Key)
     */
    this.token = args.token
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
    /**
     * @member {PolicyManager}
     * @description PolicyManager (You should be using this instead of trying to access {@link PolicyManager} directly)
     */
    this.policy = new PolicyManager({
      callAPI
    })
    /**
     * @member {DataManager}
     * @description DataManager (You should be using this instead of trying to access {@link DataManager} directly)
     */
    this.data = new DataManager({
      callAPI
    })
  }

  /**
   * @function
   * @description Call Acrosure API with corresponding url & current API key.
   * @param {string} path - An API path.
   * @param {Object} data - A data object which is specified by Acrosure.
   */
  callAPI(path, data) {
    return api(path, data, this.token)
  }
}

export default AcrosureClient
