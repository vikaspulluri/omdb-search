/*  @author: Vikas Pulluri
	@date: 24/07/2018
	@file: xhr.js
	@description: Implements functionality related to making calls via
				ajax and handover the response to util functions
	@exports: class XHR
*/

//importing required modules
import { config } from './config.js';
import { handleResponseData, handleError } from './util.js';

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
				this.showLoader();
			}).bind(this)
		});
		this.getRequest.fail(function(getResult, getStatus, errorThrown){
			handleError('fail',getResult);
			this.hideLoader()
		});
		return this;
	}
	complete(){
		this.getRequest.done((response)=>{
			this.hideLoader();
			handleResponseData(response);
		});
	}
	showLoader(){
		return $('#loader-article').append($(`<img src='../img/loader.gif'>`)).show();
	}
	hideLoader(){
		$('#loader-article').html('').hide();	
	}
}

