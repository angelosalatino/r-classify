//tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
// show hide toggle
$(document).ready(function(){
    // Toggles paragraphs display
    $(".toggle-btn").click(function(){
        $("#search #advanced").slideToggle();
    });
});
// tab browsing
$('.form').find('input, textarea').on('keyup blur focus', function (e){  
    var $this = $(this),
        label = $this.prev('label');
    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight'); 
        } else {
            label.removeClass('highlight');   
        }   
    } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
            label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
            label.addClass('highlight');
        }
    }
});
$('.tab a').on('click', function (e){  
    e.preventDefault();  
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active'); 
    var target = "";
    target = $(this).attr('href');
    $('.tab-content > div').not(target).hide();  
    $(target).fadeIn(600);  
});

// info on click
$('a.info').on('click', function (e){
    e.preventDefault(); 
});

function getBrowser() {
  if( navigator.userAgent.indexOf("Chrome") != -1 ) {
    return "Chrome";
  } else if( navigator.userAgent.indexOf("Opera") != -1 ) {
    return "Opera";
  } else if( navigator.userAgent.indexOf("MSIE") != -1 ) {
    return "IE";
  } else if( navigator.userAgent.indexOf("Firefox") != -1 ) {
    return "Firefox";
  } else {
    return "unknown";
  }
}
// click to move
$(document).ready(function(){
	if (getBrowser() != "Chrome"){
		document.getElementById("browser_warn").hidden = false;
	};
    var buttons = document.querySelectorAll(".moveItm");
    var list1 = document.getElementById("list1");
    var list2 = document.getElementById("list2");
    function moveItem(e) {
        var moveTo = this.parentElement.parentElement == list1 ? list2 : list1;
        moveTo.appendChild(this.parentElement);
        e.preventDefault();
        var formula = [];
        $('#list2 li span').each(function() {
            formula.push('{' + $(this).html() + '}');
        });
        $('#basedatadrag').val(formula.join(''));
		basedatachange();
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", moveItem);
    }
    
});
// toggle move icon
$(function() {
    $('a').click(function() {
        $(this).find('i.grab').toggleClass('fa-minus-circle fa-plus-circle');
    });
});
// input submit
$(document).ready(function(){
    $('#missing').keypress(function(e){
        var key = e.which;
        if(key == 13){
            e.preventDefault();
            var formula = [];
            var addtopic = document.getElementById("missing");
            var input2txt = $("#missing").val();
            //add custom item, protection against blank and repeated input
			if (input2txt != "" && !$('#basedatadrag').val().includes("{"+input2txt+"}")){
				$('#list2').append('<li class="button newtopic"><span class="topic">'+input2txt+'</span> <a class="info" href="http://cso.kmi.open.ac.uk/topics/'+input2txt.replace(/\s/g,"_")+'" target="_blank"><i class="fas fa-info-circle grey"></i><a href="#" id="itm" class="deleteItm"><i class="grab fas fa-minus-circle"></i></a></li>');
                
                // $('#list2').append(new ToggleButton(input2txt).genButton());
				//add value of custom item to input field
				$('#list2 li span').each(function() {
					formula.push('{' + $(this).html() + '}');
				});
				var newaddedtopics = $('#added_topics').val() + "{" + input2txt + "}"
				$('#added_topics').val(newaddedtopics);
				$('#basedatadrag').val(formula.join(''));
				basedatachange();
				//remove text from input after adding
				addtopic.value = "";
			}
			$('#missing').val('');
			$('.typeahead').typeahead('val', "");
            //delete custom item from selected topics
            $('a.deleteItm').on('click', function (e){
                e.preventDefault(); 
                $(this).parent('li.newtopic').remove();  
                //delete value of custom item from input field
                var removetopic = $(this).siblings('.topic').text();
                $("#basedatadrag").val($("#basedatadrag").val().replace('{'+removetopic+'}', ""));
				basedatachange();
				$("#added_topics").val($("#added_topics").val().replace('{'+removetopic+'}', ""));
            });
        }
    });
});

function basedatachange() {
    var topics = $('#basedatadrag').val();
	topics = topics.replace(/}{/g,", ");
    topics = topics.replace(/{/g,'');
    topics = topics.replace(/}/g,'');
    $('#view_topics').val(topics);

};

function basedatachange_legacy() {
	var topics = $('#basedatadrag').val();
	topics = topics.replaceAll("}{",", ");
	topics = topics.replaceAll("{",'');
	topics = topics.replaceAll("}",'');
	$('#view_topics').val(topics);
};


$(document).ready(function(){
	$('#added_topics').val('');
	$('#basedatadrag').val('');
});

$(document).on("click",".topics",function(e){
	var list1 = document.getElementById("list1");
    var list2 = document.getElementById("list2");
    var moveTo = this.parentElement.parentElement == list1 ? list2 : list1;
    moveTo.appendChild(this.parentElement);
	$(this).find('i.grab').toggleClass('fa-minus-circle fa-plus-circle');
    e.preventDefault();
    update_base_data();
});

$(document).on("click",".add_all",function(e){
	e.preventDefault();
	var list1 = document.getElementById("list1");
    var list2 = document.getElementById("list2");
	$('#list1 li').each(function() {
		list2.appendChild(this);
		$(this).find('i.grab').toggleClass('fa-minus-circle fa-plus-circle');
	});
	list1.innerHTML = '';
	update_base_data();
});

function update_base_data() {
	var formula = []
	$('#list2 li span').each(function() {
        formula.push('{' + $(this).html() + '}');
    });
	$('#basedatadrag').val(formula.join(''));
	basedatachange();
};

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
            $('#spinner').hide(0);
            document.querySelector('#pdf_keywords').value = json.keywords
            document.querySelector('#pdf_title').value = json.title
            document.querySelector('#pdftext').value = json.abstract

//keywords//
            if (json.keywords === "") {
                $('label[for="pdf_keywords"]').hide(0)
                $('#pdf_keywords').hide(0)
                $('#keywords_button').show(0)
            }
            else {
                $('label[for="pdf_keywords"]').show(0)
                $('#pdf_keywords').show(0)
                $('#keywords_button').hide(0)
            }
//title//
            if (json.title === "") {
                $('label[for="pdf_title"]').hide(0)
                $('#pdf_title').hide(0)
                $('#title_button').show(0)
            }
            else {
                $('label[for="df_title"]').show(0)
                $('#pdf_title').show(0)
                $('#title_button').hide(0)
            }
//abstract//
            if (json.abstract === "") {
                $('label[for="pdftext"]').hide(0)
                $('#pdftext').hide(0)
                $('#abstract_button').show(0)
            }
            else {
                $('label[for="pdftext"]').show(0)
                $('#pdftext').show(0)
                $('#abstract_button').hide(0)
            }
//Incase the PDF is not processed//
            if (json.title === "" && json.abstract === "" && json.keywords === "") {
                $("#pdf_not_processed").show(0)
                $("#pdf_processed").hide(0)
            }
            else {
                $("#pdf_processed").show(0)
                $("#pdf_not_processed").hide(0)
            }

            $('#pdftextform').show(0)
            
//Error message dialog box, whenever DOM error is caught//   
		},
		error : function (xhr,errmsg,err) {
            $('#spinner').hide(0);
            document.getElementById("access_error").innerHTML =  Swal.fire({
                title: 'Warning!',
                text: "Oops, it looks like we are unable to process your PDF at the moment. Why don't you use the annotation from text?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#F2E74B',
                confirmButtonText: '<span style="color:#000000; font-weight:bold;">Redirect me<span>',
                cancelButtonText: '<span style="color:#000000; font-weight:bold;">Close<span>'
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
        	document.getElementById("access_error").innerHTML = "Too many accesses"
        }
	});
});	


//add keywords button//
$('#keywords_button').on('click', function(){
    event.preventDefault();
    $('label[for="pdf_keywords"]').show(0)
    $('#pdf_keywords').show(0)
    $('#keywords_button').hide(0)
}) 

//add title button//
$('#title_button').on('click', function(){
    event.preventDefault();
    $('label[for="pdf_title"]').show(0)
    $('#pdf_title').show(0)
    $('#title_button').hide(0)
}) 

//add abstract button//
$('#abstract_button').on('click', function(){
    event.preventDefault();
    $('label[for="pdftext"]').show(0)
    $('#pdftext').show(0)
    $('#abstract_button').hide(0)
}) 


$('#pdftextform').on('submit', function(event) {
	event.preventDefault();
	$('#spinner').show(0);
	var data = new FormData($('#pdftextform').get(0));
        reset_error();
        $.ajax({
            url : "input/",
            type : "POST",
            data : { abstract_text : "<p><b>Title:</b></p>"+ "&nbsp" + $('#pdf_title').val() + "<br/>" + "<p><b>Abstract:</b></p>" + "&nbsp" +  $('#pdftext').val() + "<br/>" + "<p><b>Keywords:</b></p>" + "&nbsp" + $('#pdf_keywords').val() },
            success : function(json) {
                display_topics(json);
            },
            error : function(xhr,errmsg,err) {
                document.getElementById("text_error").innerHTML = "Too many accesses"
            }
        });
});	


function pdf_topics() {
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
	$.ajax({
		url : "topics/",
		type : "POST",
		data : { topics_chosen : $('#basedatadrag').val(), added_topics : $('#added_topics').val()},
		success : function(json) {
			var copy_text = document.getElementById("view_topics");
			if (copy_text.value != ""){
				copy_text.select();
				copy_text.setSelectionRange(0, 99999);
				document.execCommand("copy");
				var export_button = document.getElementById("export_clipboard");
				export_button.style.background = "#10ff10";
				export_button.innerHTML = "Copied!";
				setTimeout(function() {
					export_button.style.background = "";
					export_button.innerHTML = "Copy to Clipboard";
				}, 2500);
			}else{
				var export_button = document.getElementById("export_clipboard");
				export_button.style.background = "#a82346";
				export_button.style.color = "#ffffff";
				export_button.innerHTML = "No topics to copy";
				setTimeout(function() {
					export_button.style.background = "";
					export_button.style.color = "inherit";
					export_button.innerHTML = "Copy to Clipboard";
				}, 2500);
			};
		},
		
		error : function(xhr,errmsg,err) {
			console.log("Error in submitting topics");
		}
	});
};

function get_topics() {
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
	$("#annoplus").toggleClass('fa-times-circle fa-plus-circle');

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
		$("#list1").append(new ToggleButton(json.topic_list[i]).genButton());
		all_topics.push(json.topic_list[i]);
	};
	$('#generated_topics').val(all_topics);
	$('#spinner').hide(0);
	document.getElementById('results').hidden = false;
	document.getElementById('results').scrollIntoView({behavior: "smooth"});
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
	content = json.abstract_text
	var keys = Object.keys(anno_dict);
    keys = keys.sort(function (a, b) {
        return b.length - a.length; // descending order by length
    });
	for (let iter=0;iter<keys.length;iter++){
        function escapeRegExp(regexp) {
            return regexp.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        var regexp = escapeRegExp(keys[iter]);
        let regex = new RegExp('\\b' + regexp,'ig');
		let match = '';
		while((match = regex.exec(content)) !== null){
			if (match.index === regex.lastIndex) {
				regex.lastIndex++;
			};
			if (is_within_div(content, match.index, match.index + keys[iter].length,keys[iter]) != true){
				content = gen_anno(content, keys[iter], anno_dict[keys[iter]], match.index);
			};
		};
	};
	document.getElementById('anno_text').innerHTML = content;
	
};

function is_within_div(document, init_pos, end_pos, topic) {
    const regdiv = /<\s*div[^>]*>(.*?)<\s*div[^>]*>(.*?)<\s*\/\s*div>(.*?)<\s*\/\s*div>/gi;
    let m;

    while ((m = regdiv.exec(document)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regdiv.lastIndex) {
            regdiv.lastIndex++;
        }
        if (m.index <= init_pos) {
            if ((m.index + m[0].length) >= end_pos) {
                return true;
            }
        }

    }
    return false;
}

class ToggleButton {
	constructor(topic){
		this.topic = topic;
	};
	genButton(){
		return '<li class="ui-state-default button"><span>'+this.topic+'</span><a class="info" href="http://cso.kmi.open.ac.uk/topics/'+this.topic.replace(/\s/g,"_")+'" target="_blank"><i class="fas fa-info-circle grey"></i></a><button value = "' + this.topic + '" type = "button" class="topics" id = "topic_button" style="background: #ffffff;border-radius: 0px;min-height: 0px;margin: 0px 0px 0px 0px;padding: 1px;"><i class="grab fas fa-plus-circle"></i></button></li>'
	};
};


function gen_anno(content, title, topics, position){
	var case_title = content.substr(position, title.length);
	return content.substr(0, position) + '<div class="annotip">' + case_title +'<span class = "annotiptext"><div class="annotiptitle">Topics generated from "' + case_title + '":</div>'+topics+'</span></div>' + content.substr(position + title.length)
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
















