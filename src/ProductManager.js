/**
 * @classdesc Represents an ProductManager. (You most likely shouldn't be accessing this directly, use {@link AcrosureClient#product} instead.)
 * @class
 */
class ProductManager {
  /**
   * @description Create an product manager.
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
   * @description Get product with the specify id.
   * @param {string} id - Product id.
   * @returns {Object} Product
   */
  async get(id) {
    try {
      if (id) this.id = id
      const resp = await this.callAPI('/products/get', {
        product_id: this.id
      })
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default ProductManager
