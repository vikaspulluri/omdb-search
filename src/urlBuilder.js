import { XHR }  from './xhr.js';
import { config } from './config.js';
// const XHR = require('./xhr');
// const config = require('./config');

class UrlBuilder{
	constructor(){
		this.host_url = config.host_url;
	}
	apiKey(){
		this.host_url = `${this.host_url}/apikey=${config.api_key}`;
		return this;
	}
	title(str){
		this.host_url = `${this.host_url}/t=${str}`;
		return this;
	}
	id(str){
		this.host_url = `${this.host_url}/i=${str}`;
		return this;	
	}
	year(str){
		this.host_url = `${this.host_url}/y=${str}`;
		return this;
	}
	build(){
		return new XHR(this);
	}
}

export default new UrlBuilder();
