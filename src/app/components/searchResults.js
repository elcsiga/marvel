'use strict';

var React = require('react');

var SearchResults = React.createClass({

	getInitialState: function() {
	  return {
	    list: null,
	    more: false
	  };
	},
	
	showResults: function(list, more) {
	    this.setState({
	    	list: list,
	    	more: more
	    });	
	},

    render: function() {
    	if (this.state.list === null) //initial state
    		return <div>Enter the first letters of the character's name</div>;
    	else if (this.state.list.length)
		    return (
		    	<div>
			    	<ol>
			    		{this.state.list.map(function(item) {
							var imgUrl = item.thumbnail.path + "/standard_medium." + item.thumbnail.extension;
			        		var linkUrl = "/view/"+item.id;
	
			        		return (
					        	<li key={item.id}>
						            <a href={linkUrl}>
							            <img src={imgUrl} />
							          	{item.name}
						          	</a>
					          	</li> 
							);
			        	})}
			    	</ol>
		
		    		<p> {this.state.more ? 'There are more results, please try something more specific.' : ''} </p>
		
		    	</div>
		    );
		else
			return <div>Sorry, no characters were found.</div>;
    },
});

module.exports = SearchResults;