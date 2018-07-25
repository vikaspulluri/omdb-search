//entry file
//const config = require('./config');
import UrlBuilder from './urlBuilder.js';

(function handleEvents(){
	// Handling button click event
	$('.search-btn').on('click',()=>{
		let search_by_param_label = $('input[name="search"]:checked').next();
		let search_by_param_id = $(search_by_param_label).data('param');
		let query1 = $('#search-bar').val();
		if(!query1){return handleErrors('validation');}
		if(search_by_param_id === 'y'){
			let query2 = $('#year-bar').val();
			if(!query2){return handleErrors('validation');}
			else{new UrlBuilder().apiKey().year(query2).title(query1).build()}
		}
		if(query1 && search_by_param_id === 'i'){new UrlBuilder().apiKey().id(query1).build()}
		if(query1 && search_by_param_id === 't'){new UrlBuilder().apiKey().title(query1).build()}
	});

	//Handling radio btn change event
	$('input[type=radio][name=search]').on('change',function(e){
		if($(this).next().data('param') === 'y'){
			$('#year-bar').show();
		}else{
			$('#year-bar').hide();
		}
	});
})();

function handleErrors(type){

}