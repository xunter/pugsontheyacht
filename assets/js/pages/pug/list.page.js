parasails.registerPage('list', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    addingpug: { name: '', text: '' },
    editingpug: { id: '', date: '', name: '', text: '' },
    addnewpugmodal: false,
    pugs: []
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    clickShowNewPugModal: function() {
      //alert(this.addnewpugmodal);
      this.addnewpugmodal = true;
    },

    clickCloseNewPugModal: function() {
      //alert(this.addnewpugmodal);
      this.addnewpugmodal = false;
    },

    clickSubmitAddNewPug: function() {

    },

    submitAddNewPug: function() {

      this.addnewpugmodal = false;

      console.log(this.addingpug);

      this.pugs.push({ id: new Date().getTime(), date: new Date().toISOString(), name: this.addingpug.name, text: this.addingpug.text });



    },

    deletePug: function(deletingPug) {
      let deletingIndex = this.pugs.indexOf(deletingPug);
      console.log(deletingIndex);
      this.pugs.splice(deletingIndex, 1);
    },

    editPug: function(editingPug) {
      this.editingpug.id = editingPug.id;
        this.editingpug.date = editingPug.date;
          this.editingpug.name = editingPug.name;
            this.editingpug.text = editingPug.text;
    },

    cancelEditPug: function(editingPug) {

      this.editingpug.id = '';
    },

    saveEditingPug: function(editingPug) {
      var self = this;
      let editingPugModel = this.pugs.find(function(p) { return p.id === self.editingpug.id; });
      this.editingpug.id = '';

      editingPugModel.name = this.editingpug.name;
      editingPugModel.text = this.editingpug.text;
    }


  }
});
