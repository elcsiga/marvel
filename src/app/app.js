'use strict';


var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;
var SearchView = require('./views/searchView.js');
var CharacterView = require('./views/characterView.js');

var App = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'homeRoute',
        '/view/:id': 'viewRoute',
        '/search/:search': 'searchRoute'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    /* routes*/
    homeRoute: function() {
        return ( <SearchView/> );
    },
    viewRoute: function(id) {
        return <CharacterView id={id}/>;
    },
    searchRoute: function(search) {
        return ( <SearchView search={search}/> );
    },

    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }

});

React.render(
    <App history={true}/>,
    document.getElementById('app')
);