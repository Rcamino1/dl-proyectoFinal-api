const auth = require("./auth.route.js");
const cart = require("./cart.route.js");
const product = require("./product.route.js");
const user = require("./user.route.js");
const errors = require("./errors.route.js");

module.exports = {
  auth: auth,
  cart: cart,
  product: product,
  user: user,
  errors: errors
};
