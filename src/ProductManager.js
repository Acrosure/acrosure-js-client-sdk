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
   *   @param {string=} args.id - A product id.
   */
  constructor(args) {
    /**
     * @member {function}
     * @description callAPI Function (which should be granted by {@link AcrosureClient#callAPI} )
     */
    this.callAPI = args.callAPI
    /**
     * @member {string}
     * @description Current product id.
     */
    this.id = args.id
  }

  /**
   * @function
   * @description Set current product id.
   * @param {Object} id - A product id.
   */
  setId(id) {
    this.id = id
  }

  /**
   * @function
   * @description Get product with current id or the specify id.
   * @param {string=} id - Product id.
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

  /**
   * @function
   * @description Get products list with or without query.
   * @param {Object} args - Query object (See Acrosure API document for more detail).
   * @returns {Array} Products
   */
  async list(args) {
    try {
      const resp = await this.callAPI('/products/list', args)
      return resp
    } catch (err) {
      throw err
    }
  }
}

export default ProductManager
