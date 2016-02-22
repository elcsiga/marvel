
'use strict';

var MarvelAPI = function() {
	  
    function composeUrl(path, query) {
    	var url = 
    		"https://gateway.marvel.com:443/v1/public/" + 
    		path + 
    		"?apikey=ece489475d4a693f4ce5a7070b8feea3" +
    		(query ? ( query ) : "" )
    	;
    	return url;
    };
    
    /*
     * params = {
     * 	searchExpression: "spider",
     *  limit: 12,
     *  offset: 0,
     *  success: function( list, more ) {...}, 
     *  fail: function( textStatus ) {...}
     *  always: function( ) {...}
     * }
     */
    this.getCharacterList = function( params ) {
    	
    	var query = "&nameStartsWith=" + encodeURIComponent(params.searchExpression) +  //TODO syntax check
    	            "&limit=" + params.limit +
    	            "&offset=" + params.offset;
    	       
	 	return $.ajax({
	 		url: composeUrl( "characters" , query )
	 	})
		.done(function( response ) {
			var more = (response.data.offset * response.data.limit + response.data.count) < response.data.total;
			params.success (response.data.results, more); //TODO response structure check
		})
		.fail(function( jqXHR, textStatus ) {
			if (params.fail)
				params.fail( textStatus );
		})
		.always(function() {
			if (params.always)
				params.always();
		});
	};
	
	    /*
     * params = {
     * 	characterId: 100342,
     *  success: function( list ) {...},
     *  fail: function( textStatus ) {...}
     *  always: function( ) {...}
     * }
     */
	this.getCharacter = function( params ) {
	 	return $.ajax({
	 		url: composeUrl( "characters/"+ params.characterId )
	 	})
		.done(function( response ) {
			params.success (response.data.results[0]); //TODO response structure check
		})
		.fail(function( jqXHR, textStatus ) {
			if (params.fail)
				params.fail( textStatus );
		})
		.always(function() {
			if (params.always)
				params.always();
		});
	};
};

module.exports = MarvelAPI;