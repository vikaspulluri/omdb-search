//entry file
//const config = require('./config');
import UrlBuilder from './urlBuilder.js';
import { displaySearchContainer, displayResultsContainer, handleError } from './util.js';
(function handleEvents(){
	// Handling button click event
	$('.search-btn').on('click',()=>{
		let search_by_param_label = $('input[name="search"]:checked').next();
		let search_by_param_id = $(search_by_param_label).data('param');
		let query1 = $('#search-bar').val();
		if(!query1){return handleError('validation');}
		if(search_by_param_id === 'y'){
			let query2 = $('#year-bar').val();
			if(!query2){return handleError('validation');}
			else{
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

	$('.back-btn').on('click',()=>{
		displaySearchContainer();
		$('input[type=text]').val('');
		$('.ratings-container').html('');
		$('.characters-container').html('');
	});

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
