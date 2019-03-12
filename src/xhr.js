/*  @author: Vikas Pulluri
	@date: 24/07/2018
	@file: xhr.js
	@description: Implements functionality related to making calls via
				ajax and handover the response to util functions
	@exports: class XHR
*/

//importing required modules
window.jQuery = require('jquery');
var $ = jQuery;
import { config } from './config.js';
import { handleResponseData, handleError, showLoader, hideLoader } from './util.js';

/*Exporting a class, so that object instance will be created when 
called via new keyword. It will instaitiate from UrlBuilder class
*/
export class XHR {
	constructor(builder) {
		this.host_url = builder.host_url;
	}

	makeRequest() {
		this.getRequest = $.ajax({
			url: this.host_url,
			type: 'GET',
			beforeSend: (function(){
				showLoader();
			})
		});
		this.getRequest.fail(function(getResult, getStatus, errorThrown){
			handleError('fail',getResult);
			hideLoader()
		});
		return this;
	}
	complete(){
		this.getRequest.done((response)=>{
			hideLoader();
			handleResponseData(response);
		});
	}

}

