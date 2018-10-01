/**
 * @classdesc Represents an ProductManager. (You most likely shouldn't be accessing this directly, use {@link AcrosureClient#product} instead.)
 * @class
 */
class ProductManager {
  /**
   * @description Create an product manager.
   * @constructor
   * @param {Object} args - An object consists of several properties.
   *   @param {function} args.id - A product id.
   *   @param {function} args.callAPI - A function which call Acrosure API.
   */
  constructor(args) {
    /**
     * @member {function}
     * @description callAPI Function (which should be granted by {@link AcrosureClient#callAPI} )
     */
    this.callAPI = args.callAPI
    /**
     * @member {function}
     * @description Current product id.
     */
    this.id = args.id
    /**
     * @var {Object} formItems
     * @description An object of current product form items.
     */
  }

  /**
   * @function
   * @description Set current product id.
   * @param {Object} id - A product id.
   */
  setID(id) {
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
      this.formItems = this.mapProductFormItems(resp.form_items)
      return resp
    } catch (err) {
      throw err
    }
  }

  /**
   * @function
   * @description Get product's form items of current product or newly specify product id.
   * @param {string=} id - Product id.
   * @returns {Object} Product form items
   */
  async getFormItems(id) {
    if (this.formItems) return this.formItems
    if (!this.id && !id) {
      throw new Error('No product id')
    }
    try {
      if (id) this.id = id
      const resp = await this.callAPI('/products/get', {
        product_id: this.id
      })
      this.formItems = this.mapProductFormItems(resp.form_items)
      return this.formItems
    } catch (err) {
      throw err
    }
  }

  mapProductFormItems(fields) {
    const items = {}
    forEach(fields, o => {
      if (o.values) {
        items[o.key] = o.values
      }
      if (o.fields) {
        items[o.key] = this.mapProductFormItems(o.fields)
      }
    })
    return items
  }
}

export default ProductManager
