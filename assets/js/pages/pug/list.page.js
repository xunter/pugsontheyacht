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

    //let csrf = ;

    let backendApiService = {
      add: async function(pug) {
        const rawResponse = await fetch('/api/pug/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pug)
        });
        const content = await rawResponse.json();

        return content.addedPug;
      },


        update: async function(pug) {
          const rawResponse = await fetch('/api/pug/update', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(pug)
          });
          const content = await rawResponse.json();
          return content.updatedPug;
        },


          delete: async function(pug) {
            const rawResponse = await fetch('/api/pug/delete', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(pug)
            });
            const content = await rawResponse.json();
            return content.deletedPug;
          }

    };

    _.extend(this, {backendApiService: backendApiService});
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
      let self = this;
      this.addnewpugmodal = false;

      console.log(this.addingpug);

      this.backendApiService.add(this.addingpug).then(function(addedPug) {
        const newpug = _.extend({}, self.addingpug);
        newpug.id = addedPug.id;
        newpug.date = addedPug.date;
        self.pugs.push(newpug);
      });

      //this.pugs.push({ id: new Date().getTime(), date: new Date().toISOString(), name: this.addingpug.name, text: this.addingpug.text });



    },

    deletePug: function(deletingPug) {
      let self = this;


      this.backendApiService.delete(deletingPug).then(function(deletedPug) {

        let deletingIndex = self.pugs.indexOf(deletingPug);
        console.log(deletingIndex);
        self.pugs.splice(deletingIndex, 1);
      });
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

      this.backendApiService.update(self.editingpug).then(function(updatedPug) {
        let editingPugModel = self.pugs.find(function(p) { return p.id === updatedPug.id; });
        self.editingpug.id = '';

        editingPugModel.name = updatedPug.name;
        editingPugModel.text = updatedPug.text;
      });

    }


  }
});
