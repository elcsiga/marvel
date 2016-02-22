
'use strict';

var React = require('react');
var GrayscaleImageData = require('../services/grayscaleImageData.js');


var LineArtCanvas = React.createClass({
   	
  	render: function() {
  		
  		var sobelKernel3x3 = [
           [ -1, 0, 1 ],
           [ -2,  0, 2 ],
           [ -1, 0, 1 ]
        ];
        
		var image = new Image();
		image.onload = function(){
		    var width = image.width;
		    var height = image.height;
		
		    var canvas = document.createElement("canvas");
		    canvas.width = width;
		    canvas.height = height;
		    var context = canvas.getContext("2d");
		    context.drawImage(image, 0, 0);

			//image manipulation		
			try {

			    var imageData = context.getImageData(0,0,width, height);
			    new GrayscaleImageData(imageData)
			        .applySobelFilter(sobelKernel3x3)
			        .applyInvertFilter()
			        .applyContrastFilter(100,2)
			        .copyTo(imageData);
			    context.putImageData(imageData,0,0);				

			} catch (err) {
				alert("Some browsers do not allow manipulation on images from remote origins. Creating line-art image failed. Try Firefox!");
			}
		
		    document.getElementById("canvas-container").appendChild(canvas); //TODO prepare for multiple instances
		};
		image.src = this.props.src;
		image.crossOrigin = "Anonymous";
        
	    return (
			<div id='canvas-container'></div>
	    );
  	}  
});

module.exports = LineArtCanvas;

