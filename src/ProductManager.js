import 'whatwg-fetch'

/**
 * @classdesc Represents a Product manager.
 * @class
 */
class Product {
  /**
   * Create a ProductManager.
   * @constructor
   * @param {Object} args - An object consists of several properties.
   *   @param {string} args.publicKey - A public API key.
   *   @param {string=} args.productId - A product id.
   */
  constructor(args) {
    this.productID = args.productID
  }
}

export default Product
