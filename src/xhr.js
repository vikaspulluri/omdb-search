// Implements functionality related to ajax calls
// const $ = require('./jquery.min');
import { config } from './config.js';
import { handleResponseData } from './util.js';

export class XHR {
	constructor(builder) {
		this.host_url = builder.host_url;
	}

	makeRequest() {
		this.getRequest = $.ajax({
			url: this.host_url,
			type: 'GET',
			beforeSend: function(){
				$('.search-btn').html('').append(`<img src='../img/loader.gif'>`);
			}
		});
		this.getRequest.fail(function(getResult, getStatus, errorThrown){
			console.log(getResult);
		});
		this.getRequest.always(function(){
			$('.search-btn').html('Search');
		});
		return this;
	}
	complete(){
		this.getRequest.done((response)=>{
			handleResponseData(response);
		});
	}
	
}

