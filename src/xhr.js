// Implements functionality related to ajax calls
// const $ = require('./jquery.min');
import { config } from './config.js';
// require('./config');
export class XHR{
	constructor(builder){
		this.host_url = builder.host_url;
		console.log(this.host_url);
	}
	
}

