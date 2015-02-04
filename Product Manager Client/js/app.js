App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('product', {path: 'products/:product_id'});
  this.route('addProduct', {path: 'addProducts/'});
  this.route('editProduct', {path: 'editProducts/:product_id'});
  this.route('ProductConfirmation', {path: 'addProductConfirm/'});
  this.route('EditProductConfirmation', {path: 'editProductConfirm/'});
});



//####Model####//
App.Product = DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  price: DS.attr()
});


App.ProductAdapter = DS.FixtureAdapter.extend();

//####Dummy Data####//
App.Product.FIXTURES = [

  {
    id: 1,
    name: 'Playstation 3',
    description: 'Last Gen console with the best exclusives',
    price: 200

  },
  {
    id: 2,
    name: 'Xbox 360',
    description: 'Last gen console with the best addons like Kinnect',
    price: 160

  }

];



//####Routes####//
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('product');
  }
});





//####Controllers####//

App.IndexController = Ember.ArrayController.extend({

  actions: {
    deleteProduct: function(product) {
      if(confirm('Are you sure you want to delete this product?')) {
        product.destroyRecord().then(function() {
          alert("Product destroyed!");
        });
      }
    }
  }

});


App.AddProductController = Ember.ObjectController.extend({

  model: {},

  actions: {
    saveProduct: function() {
      var newProduct = this.store.createRecord('product', {
        name: this.get('name'),
        description: this.get('description'),
        price: this.get('price')
      }),
          controller = this;
      newProduct.save().then(function() {
        controller.transitionToRoute('ProductConfirmation');
      });
    }
  }

});

App.EditProductController = Ember.ObjectController.extend({

  actions: {
    saveProduct: function(){
      var controller = this;
      this.get('model').save().then(function() {
        controller.transitionToRoute('EditProductConfirmation');
      });
    }
  }

});



