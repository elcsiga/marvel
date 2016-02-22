
'use strict';

var React = require('react');

var SearchBox = React.createClass({
  
	getInitialState: function() {
		return {
			searchExpression: ''
		};
  	},
	
	setText: function( text ) {
		this.setState({searchExpression: text});
	},
	
	/*
	 * search event, fired when a new search expression has been entered into the search box
	 * use from parent component listener:
	 *   this.refs.searchBox.onSearchExpressionEntered( function( searchExpression ) { ... }
	 */
	listener: null,
	onSearchExpressionEntered: function( listener ) {
		this.listener = listener;
	},

	typingTimer: null,
	handleChange: function(event) {
		var self = this;
		self.setState({searchExpression: event.target.value});
		
		if (self.typingTimer)	
			clearTimeout(self.typingTimer);
		this.typingTimer = setTimeout(function() {
		    if (self.state.searchExpression.length)
		    	self.startSearch( self.state.searchExpression );
		}, 1000);
	},
	
	componentWillUnmount: function() {
		if (self.typingTimer)	
			clearTimeout(self.typingTimer);
	},
	
	startSearch: function( searchExpression ) {
		if (this.listener) {
			this.listener(searchExpression);
		}
	},
  	
  	render: function() {
	    return (
	    	<input
		        type="text"
		        value={this.state.searchExpression}
		        onChange={this.handleChange}
		        placeholder="Search for characters ..."
	    	/>
	    );
  	}  
});

module.exports = SearchBox;

