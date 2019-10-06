/**
 * PugController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `PugController.list()`
   */
  list: async function (req, res) {
    var pugs = await Pug.find().sort("date");
    return res.view("pages/pug/list", { pugs: pugs });
  }

};
