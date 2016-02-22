
'use strict';

var React = require('react');

var SearchResults = require('../components/searchResults.js');
var SearchBox = require('../components/searchBox.js');
var MarvelAPI = require('../services/marvelAPI.js');
var routerNavigate = require('react-mini-router').navigate;

var SearchView = React.createClass({
  
   	doSearch: function( searchExpression ) {	
 		var self = this;
		self.searchRequest = new MarvelAPI().getCharacterList({
			searchExpression: searchExpression, 
			limit: 24,
			offset: 0,
			success: function (list, more) {
				self.refs.searchResults.showResults(list, more);
			},			
			fail: function( textStatus ) { 
				self.refs.searchResults.showResults( [] ); //TODO error reporting
			},
			always: function () {
				self.setState({
					loading: false
				});
			},					
		});
		self.refs.searchBox.setText ( searchExpression );
		self.setState({
			loading: true
		});
	},
	
	getInitialState: function() {
		return {
			loading: false
		};
  	},
	componentDidMount: function() {	
		
		var self = this;
		
		//doing initial search - processing urls like '/search/spider'
		if (self.props.search) {
			self.doSearch(self.props.search);
		}
		//querying Marvel API and rendering results if a search expression has been entered into search box
		self.refs.searchBox.onSearchExpressionEntered( function( searchExpression ) {
			self.doSearch(searchExpression);
			routerNavigate(searchExpression ? '/search/' + searchExpression : "/", true); //changing url silently
	  	});	
	},

	componentWillUnmount: function() {
		if (this.searchRequest)
			this.searchRequest.abort();
	},

  	render: function() {
  		var progressindicator = <img src='assets/images/loading.gif' /> ;
	    return (
        	<div>
        	    <div>
	        		<SearchBox ref="searchBox"/>
	        		{ this.state.loading ? progressindicator : ''}
	        	</div>
	        	<SearchResults ref="searchResults"/>
        	</div>
	    );
  	}  
});

module.exports = SearchView;
