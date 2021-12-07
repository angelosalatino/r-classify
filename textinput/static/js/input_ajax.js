$('#text_input1').on('submit', function(event){
    event.preventDefault();
	$('#spinner').show(0);
    get_topics();
});



$('#topics_form').on('submit', function(event) {
	event.preventDefault();
	save_topics();
});

$('#pdf_form').on('submit', function(event) {
	event.preventDefault();
	$('#spinner').show(0);
	var data = new FormData($('#pdf_form').get(0));
	$.ajax({
		url : "pdfinput/",
		type: "POST",
		data : data,
		processData: false,
		contentType: false,
		success: function(json) {
			display_topics(json);
		},
		error : function(xhr,errmsg,err) {
			document.getElementById("access_error").innerHTML = "Too many accesses"
		}
	});
});	

function basedatachange() {
	var topics = $('#basedatadrag').val();
	console.log("t");
	topics = topics.replaceAll("}{",", ");
	topics = topics.replaceAll("{","");
	topics = topics.replaceAll("}","");
	$('#view_topics').val(topics);
};



function pdf_topics() {
	console.log("pdf_topics called");
	reset_error();
	$.ajax({
		url : "pdfinput/",
		type : "POST",
		data : new FormData($('#pdf_form').get(0).files),
		processData: false,
		contentType: false,
		processData: false,
		success : function(json) {
			display_topics(json);
		},
		error : function(xhr,errmsg,err) {
			console.log(errmsg);
		}
	});
}
			

function save_topics() {
	console.log("save_topics called");
	$.ajax({
		url : "topics/",
		type : "POST",
		data : { topics_chosen : $('#basedatadrag').val(), added_topics : $('#added_topics').val()},
		success : function(json) {
			var copy_text = $("#view_topics").val();
			navigator.clipboard.writeText(copy_text)
				.then(() => {
					console.log("Copied");
				})
				.catch(() => {
					console.log("Not copied");
				});
			
			var export_button = document.getElementById("export_clipboard");
			export_button.style.background = "#10ff10";
			export_button.innerHTML = "Copied!";
			setTimeout(function() {
				export_button.style.background = "";
				export_button.innerHTML = "Copy to Clipboard";
			}, 2500);
		},
		
		error : function(xhr,errmsg,err) {
			console.log("Error in submitting topics");
		}
	});
};

function get_topics() {
    console.log("create post is working!") // sanity check
    reset_error();
    $.ajax({
		url : "input/",
		type : "POST",
		data : { abstract_text : $('#text_input').val() },
		success : function(json) {
			display_topics(json);
		},
		
		error : function(xhr,errmsg,err) {
			document.getElementById("text_error").innerHTML = "Too many accesses"
		}
	});
	
};

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");
	$("#annoplus").toggleClass('fa-minus-circle fa-plus-circle');

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 

function reset_error() {
    document.getElementById("text_error").innerHTML = "";
    document.getElementById("access_error").innerHTML = "";
};

function display_topics(json) {
	$('#input_text').val('');
	$('#basedatadrag').val('');
	basedatachange();
	$('#list1').empty();
	$('#list2').empty();
	annotate_doc(json);
	var all_topics = [];
	for (var i = 0; i<json.topic_list.length; i++) {
		$("#gen_list").append('<li>'+json.topic_list[i]+"</li>");
		$("#list1").append(new ToggleButton(json.topic_list[i],"Semantic", json.syntactic, json.semantic).genButton());
		all_topics.push(json.topic_list[i]);
	};
	$('#generated_topics').val(all_topics);
	$('#spinner').hide(0);
	document.getElementById('results').hidden = false;
	document.getElementById('results').scrollIntoView({behavior: "smooth"});
	console.log("Topics returned");
};

function annotate_doc(json) {
	var anno_dict = {};
	var explanation = json.explanation
	var topics = json.topic_list
	for (var index = 0;index<topics.length;index++){
		var keywords = explanation[topics[index]];
		for (var dict_index = 0;dict_index<keywords.length;dict_index++){
			if (anno_dict[keywords[dict_index]] === undefined){
				anno_dict[keywords[dict_index]] = [];
			}
			anno_dict[keywords[dict_index]].push(" " + topics[index]);
		};
	};
	console.log(anno_dict.communities);
	content = json.abstract_text
	content = content.replaceAll(/<.+>/g,'');
	var index = 0;
	for (let k in anno_dict){
		console.log(k)
		content = content.replaceAll(" " + k + " ", new Annotation(k, anno_dict[k]).genDiv());  //replace all spaces with ¬ to avoid replacing text in the tooltip
		index++;
	};
	console.log(content);
	content = content.replaceAll('¬',' ');
	document.getElementById('anno_text').innerHTML = content;
	console.log(content);
	
};

class ToggleButton {
	constructor(topic, module, syntactic, semantic){
		this.topic = topic;
		this.module = module;
		this.moduleText = this.genModuleText(syntactic, semantic);
	};
	genModuleText(syntactic, semantic){
		if (syntactic.includes(this.topic)){
			if (semantic.includes(this.topic)){
				return "Extracted using both the <b>syntactic</b> and <b>semantic</b> modules"
			}else{
				return "Extracted using the <b>syntactic</b> module"
			};
		};
		return "Extracted using the <b>semantic</b> module"
	};
	genButton(){
		return '<li class="ui-state-default button"><span>'+this.topic+'</span> <a href="#" class="info" data-placement="top"><i class="fas fa-info-circle grey"></i><div class="infotext"><div class="infotitle">'+this.topic+':</div>'+this.moduleText+'</div></a> <button value = "' + this.topic + '" type = "button" class="topics" id = "topic_button" style="background: #ffffff;border-radius: 0px;min-height: 0px;margin: 0px 0px 0px 0px;padding: 1px;"><i class="grab fas fa-plus-circle"></i></button></li>'
	};
};

class Annotation {
	constructor(title, contents){
		this.title = title.replaceAll(' ','¬');
		for (let i in contents){
			contents[i] = contents[i].replaceAll(' ','¬');
		};
		this.contents = contents;
	};
	genDiv(){
		return '<div class="annotip">' + this.title +'<span class = "annotiptext"><div class="annotiptitle">Topics generated from "' + this.title + '":</div>'+this.contents+'</span></div>'
	};
};

$(function() {


    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});