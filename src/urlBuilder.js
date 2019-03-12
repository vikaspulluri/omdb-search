/*  @author: Vikas Pulluri
	@date: 24/07/2018
	@file: urlBuilder.js
	@description: Utilizing the "Builder" design pattern to build the 
				dynamic host_url.
	@exports: class UrlBuilder
*/

//Importing required modules
window.jQuery = require('jquery');
var $ = jQuery;
import { XHR }  from './xhr.js';
import { config } from './config.js';
// const XHR = require('./xhr');
// const config = require('./config');

/* Creating a ES-6 class and each method will build the host_url.

*/
class UrlBuilder{
	constructor(){
		this.host_url = config.host_url;
	}
	apiKey(){
		this.host_url = `${this.host_url}/?apikey=${config.api_key}`;
		return this;
	}
	title(str){
		this.host_url = `${this.host_url}&t=${str}`;
		return this;
	}
	id(str){
		this.host_url = `${this.host_url}&i=${str}`;
		return this;	
	}
	year(str){
		this.host_url = `${this.host_url}&y=${str}`;
		return this;
	}

	//This method should be called last and will instantiate a XHR object
	build(){
		return new XHR(this);
	}
}

export default UrlBuilder;
