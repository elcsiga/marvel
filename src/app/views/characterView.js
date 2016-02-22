
'use strict';

var React = require('react');

var SearchResults = require('../components/searchResults.js');
var SearchBox = require('../components/searchBox.js');
var MarvelAPI = require('../services/marvelAPI.js');
var LineArtCanvas = require('../components/LineArtCanvas.js');

var SearchView = React.createClass({
  
  	getInitialState: function() {
		return {
			info: null,
  		};
	},
	componentDidMount: function() {	
		var self = this;
		self.searchRequest = new MarvelAPI().getCharacter({
			characterId: this.props.id, 
			success: function (info) { 
			    self.setState({
			    	info: info
			    });					
			},			
			fail: function( textStatus ) { 
				//TODO error reporting
			}			
		});
	},

	componentWillUnmount: function() {
		if (this.searchRequest)
			this.searchRequest.abort();
	},

  	render: function() {
  		var info = this.state.info;
	    if (info) {
	    	var thumbnailUrl = info.thumbnail.path + "/standard_medium." + info.thumbnail.extension;
	    	var imageUrl = info.thumbnail.path + "/detail." + info.thumbnail.extension;
		    return (
		    	
		    	<div>
		        	<LineArtCanvas src={imageUrl} />
			    	
		        	<div id='character-sheet'>
		        	    <img src={thumbnailUrl} />
			        	<h3> {info.name} </h3>
			        	<p> {info.description} </p>
		        	</div>
	        	</div>
		    );
		}
		else
			return (<div></div>);
  	}  
});

module.exports = SearchView;
