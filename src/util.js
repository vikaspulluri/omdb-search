/*  @author: Vikas Pulluri
	@date: 24/07/2018
	@file: util.js
	@description: Main module to handle all utility functions like response
				handling and error handling
*/

//importing required modules
import { config } from './config.js';

/*This function gets called once the response is ready in XHR object.
	It will split the data into multiple objects and hand over those
	objects into injectDataIntoDOM() to inject them into DOM
@param: data - Object --- actual response from XHR
*/
export function handleResponseData(data){
	if((data.Response && data.Response === false) || data.Error){
		return handleError('404',data.Error);
	}
	displayResultsContainer();
	let basicInfo = {};
	basicInfo.title = data.Title ? data.Title : config.unavailable_message;
	basicInfo.rated = data.Rated ? data.Rated : config.unavailable_message;
	basicInfo.attributes = [];
	basicInfo.attributes['year'] = data.Year ? data.Year : config.unavailable_message;
	basicInfo.attributes['released'] = data.Released ? data.Released : config.unavailable_message;
	basicInfo.attributes['runtime'] = data.Runtime ? data.Runtime : config.unavailable_message;
	basicInfo.attributes['type'] = data.Type ? data.Type : config.unavailable_message;
	basicInfo.attributes['language'] = data.Language ? data.Language : config.unavailable_message;
	basicInfo.attributes['genre'] = data.Genre ? data.Genre : config.unavailable_message;
	basicInfo.ratings = data.Ratings ? data.Ratings : config.unavailable_message;
	
	let posterInfo = {};
	posterInfo.img = data.Poster ? data.Poster : config.unavailable_message;
	
	let castInfo = {};
	castInfo.actors = data.Actors ? data.Actors : config.unavailable_message;
	castInfo.director = data.Director ? data.Director : config.unavailable_message;
	castInfo.plot = data.Plot ? data.Plot : config.unavailable_message;
	castInfo.writer = data.Writer ? data.Writer : config.unavailable_message;
	castInfo.production = data.Production ? data.Production : config.unavailable_message;

	let imdbInfo = {};
	imdbInfo.id = data.imdbID ? data.imdbID : config.unavailable_message;
	imdbInfo.votes = data.imdbVotes ? data.imdbVotes : config.unavailable_message;
	imdbInfo.rating = data.imdbRating ? data.imdbRating : config.unavailable_message;
	imdbInfo.metascore = data.Metascore ? data.Metascore : config.unavailable_message;

	let otherInfo = {};
	otherInfo.boxOffice = data.BoxOffice ? data.BoxOffice : config.unavailable_message;
	otherInfo.country = data.Country ? data.Country : config.unavailable_message;
	otherInfo.dvd = data.DVD ? data.DVD : config.unavailable_message;
	otherInfo.website = data.Website ? data.Website : config.unavailable_message;
	otherInfo.awards = data.Awards ? data.Awards : config.unavailable_message;

	injectDataIntoDOM(basicInfo,'basic');
	injectDataIntoDOM(posterInfo,'poster');
	injectDataIntoDOM(castInfo,'cast');
	injectDataIntoDOM(imdbInfo,'imdb');
	injectDataIntoDOM(otherInfo,'other');
}

/*Function to create the DOM elements
@param: strongText - string --- text to be displayed in strong element
@param: pText - string --- text to be displayed in p element

*/
export function makeTemplate(strongText,pText){
	let div = $(`<div class='item'></div>`);
	let strong = $(`<strong></strong>`);
	let p = $(`<p></p>`);
	$(strong).text(strongText);
	$(p).text(pText);
	$(div).append([strong,p]);
	return $(div);
}

/* Function to inject response data into DOM
@param: info - Object --- object contains data to be injected
@param: type - String --- type of object data, so that data will be injected into respective divs
*/
export function injectDataIntoDOM(info,type){
	//injecting basicInfo object
	if(type === 'basic'){
		let counter = 1;
		let span = [];
		$('.results-container .title h1').text(info.title);
		$('.results-container .rated p').text(`(${info.rated})`);
		for(let attrubute in info.attributes){
			span.push($(`<span><b>${attrubute}</b>${info.attributes[attrubute]}</span>`));
			if(counter == 2){
				let div = $(`<div class='column'></div>`);
				$(div).append($(span)[0]);
				$(div).append($(span)[1]);
				$(div).appendTo($('.characters-container'));
				span = [];
				counter = 0;
			}
			counter++;
		}
		for(let rating of info.ratings){
			let div = $(`<div class='column'></div>`);
			let p1 = $(`<p>${rating.Value}</p>`);
			let p2 = $(`<p>${rating.Source}</p>`);
			$(div).append([p1,p2]);
			$(div).appendTo($('.ratings-container'));
		}
	}
	//injecting poster image
	else if(type === 'poster'){
		if(info.img !== config.unavailable_message){
			let img = $(`<img src='${info.img}'>`)
			$('.img-holder').append($(img));
		}else{
			$('.img-holder .default-img').show();
		}
	}
	//injecting cast details
	else if(type === 'cast'){
		for(let item in info){
			let div = makeTemplate(item,info[item]);
			if(item === 'plot'){
				div.appendTo($('#overview'));
			}else{
				div.appendTo($('#cast'));
			}
		}
	}
	//injecting imdb and other info into DOM
	else if(type === 'imdb' || type === 'other'){
		for(let item in info){
			if(info[item] !== config.unavailable_message){
				let div = makeTemplate(item,info[item]);
				type === 'imdb' ? div.appendTo($('#imdb-data')) : div.appendTo($('#other'));
			}	
		}
	}
}

/*Function to handle all types of errors. It will display 
either actual error that we get from api or default error message in config
@param: type - String --- type of error message
@param: errMsg - String --- Message to be displayed to user
*/
export function handleError(type,errMsg){
	$('.error-container').text(errMsg || getDefaultErrorMsg(type));
}

//Function to show results
export function displayResultsContainer(){
	$('#search-article').hide();
	$('#results-article').show();
}

//Function to show search bar
export function displaySearchContainer(){
	$('#results-article').hide();
	$('#search-article').show();	
}

/*Function to return default error message from config
@param: type - String --- type of error message
*/
function getDefaultErrorMsg(type){
	switch(type){
		case 'validation':
			return config.validationErrMsg;
			break;
		default:
			return config.generalErrMsg;
	}
}

export function showLoader(){
	return $('#loader-article').show();
}
export function hideLoader(){
	$('#loader-article').hide();	
}