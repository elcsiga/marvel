
'use strict';

/*
 * A grayscale version of the RGBA ImageData structure, with some filtering features
 */

var GrayscaleImageData = function(imageData) {

    this.width = imageData.width;
    this.height = imageData.height;
    this.data = [];
    for (var i=1;i<imageData.data.length; i+=4) 
        this.data.push( (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3 );
    
    this.applySobelFilter = function(filter) {
        var filteredData = new Array(this.height*this.width);
        for (var i=0; i < filteredData.length; i++)
        	filteredData[i] = 0;
        	
        var filterHalfSize = (filter.length-1) / 2;
       
        for (var y=1;y<this.height-1; y++) 
        for (var x=1;x<this.width-1; x++) {
               
            var valueHorizontal = 0;
            var valueVertical = 0;
            for (var fy = -filterHalfSize; fy <= filterHalfSize; fy++) 
            for (var fx = -filterHalfSize; fx <= filterHalfSize; fx++) {
                var source = this.data[(y+fy)*this.width + x+fx];
                valueHorizontal += source * filter[fy+filterHalfSize][fx+filterHalfSize]; //horizontal
                valueVertical += source * filter[fx+filterHalfSize][fy+filterHalfSize];//vertical
            }
            var value = Math.abs(valueHorizontal) + Math.abs(valueVertical);
            filteredData[y*this.width + x] = Math.min(Math.max(value, 0), 255);
        }
        this.data = filteredData;
        return this;
    };
    
    this.applyInvertFilter = function(filter) {
        for (var i=1;i<this.data.length; i++) 
            this.data[i] = 255-this.data[i];
        return this;
    };
    
    this.applyContrastFilter = function(level, contrast) {
        for (var i=1;i<this.data.length; i++) {
            var value = (this.data[i] -level) * contrast + level;
            this.data[i] =  Math.min(Math.max(value, 0), 255);
        }
        return this;
    };
    
    this.copyTo = function(imageData) {
        if (imageData.data.length != this.data.length*4)
            throw "Different sizes are not implemented";
            
        for (var i=1;i<this.data.length; i++) {
            imageData.data[i*4] = imageData.data[i*4+1] = imageData.data[i*4+2] = this.data[i];
            imageData.data[i*4+3] = 255; //alpha
        }
        return this;
    };
    
    return this;
};

module.exports = GrayscaleImageData;