// Implements functionality related to ajax calls
import { config } from './config.js';
import { handleResponseData, handleError } from './util.js';

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

