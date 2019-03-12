/*  @author: Vikas Pulluri
	@date: 24/07/2018
	@file: index.js
	@description: Main entry file for the application. Actual execution 
				starts here. Will support only for ES-6 compatible 
				browsers. This file handles all events triggred in DOM
*/

//importing required modules for this file
window.jQuery = require('jquery');
var $ = jQuery;
import UrlBuilder from './urlBuilder.js';
import { displaySearchContainer, displayResultsContainer, handleError } from './util.js';

/* named IIFE to handle events occured in DOM */
(function handleEvents(){
	// Handling search-btn click event
	$('.search-btn').on('click',()=>{
		let search_by_param_label = $('input[name="search"]:checked').next();
		let search_by_param_id = $(search_by_param_label).data('param');
		let query1 = $('#search-bar').val().trim();

		//if no query, throw validation error
		if(!query1){return handleError('validation');}

		//if search by year and title, execute this
		if(search_by_param_id === 'y'){
			let query2 = $('#year-bar').val().trim();

			//if no query, throw validation error
			if(!query2){return handleError('validation');}
			else{
				//if query is present, construct host_url and make request
				new UrlBuilder()
						.apiKey()
						.title(query1)
						.year(query2)
						.build()
						.makeRequest()
						.complete()
			}
		}
		if(query1 && search_by_param_id === 'i'){
			new UrlBuilder()
					.apiKey()
					.id(query1)
					.build()
					.makeRequest()
					.complete()
		}
		if(query1 && search_by_param_id === 't'){
			new UrlBuilder()
					.apiKey()
					.title(query1)
					.build()
					.makeRequest()
					.complete()
		}
	});

	//Handling radio btn change event
	$('input[type=radio][name=search]').on('change',function(e){
		if($(this).next().data('param') === 'y'){
			$('#year-bar').show();
		}else{
			$('#year-bar').hide();
		}
	});

	//Handling back btn click event. Erase all the injected data into DOM
	$('.back-btn').on('click',()=>{
		displaySearchContainer();
		$('input[type=text]').val('');
		$('.ratings-container').html('');
		$('.characters-container').html('');
		$('.content').children().each(function(i,item){
			$(item).html('');
		});
		($('.img-holder').children().length > 1) ? $('.img-holder img:last-child').remove() : $('.img-holder .default-img').hide();
		$('.error-container').text('');
	});

	//Handling click event for tabs-container
	$('.tabs-container li').on('click',function(){
		$(this).addClass('active');
		$(this).siblings().each(function(i,item){
			$(item).removeClass('active');
		});
		let target_id = $(this).attr('target-id');
		$(`#${target_id}`).addClass('active');
		$(`#${target_id}`).siblings().each(function(i,item){
			$(item).removeClass('active');
		});
	});
})();
