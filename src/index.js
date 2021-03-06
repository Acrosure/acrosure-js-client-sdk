import ApplicationManager from './ApplicationManager'
import ProductManager from './ProductManager'
import PolicyManager from './PolicyManager'
import DataManager from './DataManager'
import TeamManager from './TeamManager'

import api from './common/api'
import { isNode } from './common/helpers'

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
      callAPI
    })
    /**
     * @member {ProductManager}
     * @description ProductManager (You should be using this instead of trying to access {@link ProductManager} directly)
     */
    this.product = new ProductManager({
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
    /**
     * @member {TeamManager}
     * @description TeamManager (You should be using this instead of trying to access {@link TeamManager} directly)
     */
    this.team = new TeamManager({
      callAPI
    })
    this.apiURL = args.apiURL
  }

  /**
   * @function
   * @description Call Acrosure API with corresponding url & current API key.
   * @param {string} path - An API path.
   * @param {Object} data - A data object which is specified by Acrosure.
   */
  callAPI(path, data) {
    return api(path, data, this.token, this.apiURL)
  }

  /**
   * @function
   * @description Verify signature in webhook event (Node.js only).
   * @param {string} signature - A signature received from webhook.
   * @param {string} data - A string of raw data.
   * @returns {bool} Whether the signature is valid or not.
   */
  verifySignature(signature, data) {
    if (!isNode()) {
      throw new Error('Only available on Node.js enviroment')
    }
    const crypto = require('crypto')
    const hmac = crypto.createHmac('sha256', this.token)
    hmac.update(data)
    const expected = hmac.digest('hex')
    return signature === expected
  }
}

export default AcrosureClient
