import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('item.view');

  this.route('item', function() {
    this.route('view', {path:"view/:id"});
    this.route('detail', {path:"detail/:id"});
  });
});

export default Router;
