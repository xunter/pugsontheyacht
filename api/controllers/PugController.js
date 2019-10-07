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
  },

  add: async function(req, res) {
    let newPugId = await sails.helpers.generateGuid();
    let mongoDbId = newPugId.replace('-', '').replace('-', '').replace('-', '').replace('-', '').substr(0, 24);
    let addingPug = req.body;
    let newPugRecord = await Pug.create(_.extend(addingPug, { id: mongoDbId, date: new Date().toISOString() })).fetch();

    return res.json({ addedPug: newPugRecord });
  },

  update: async function(req, res) {
    //let newPugId = await sails.helpers.generateGuid();
    let updatingPug = req.body;
    let updatingPugRecord = await Pug.findOne({ id: updatingPug.id });

    updatingPugRecord.name = updatingPug.name;
    updatingPugRecord.text = updatingPug.text;
    let updatedPugRecord = await Pug.updateOne({ id: updatingPug.id }).set(updatingPug);
    return res.json({ updatedPug: updatedPugRecord });
  },

  delete: async function(req, res) {
    //let newPugId = await sails.helpers.generateGuid();
    let deletingPug = req.body;
    let deletedPugRecord = await Pug.destroyOne({ id: deletingPug.id });

    return res.json({ deletedPug: deletedPugRecord });
  }
};
