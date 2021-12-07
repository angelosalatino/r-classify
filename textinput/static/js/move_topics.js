$(document).on("click",".topics",function(e){
	var list1 = document.getElementById("list1");
    var list2 = document.getElementById("list2");
    var moveTo = this.parentElement.parentElement == list1 ? list2 : list1;
	console.log("moveTo:" + moveTo);
	console.log("parent: " + this.parentElement);
    moveTo.appendChild(this.parentElement);
	$(this).find('i.grab').toggleClass('fa-minus-circle fa-plus-circle');
    e.preventDefault();
    var formula = [];
    $('#list2 li span').each(function() {
		console.log($(this).html());
        formula.push('{' + $(this).html() + '}');
    });
	
    $('#basedatadrag').val(formula.join(''));
    var topics = $('#basedatadrag').val();
	topics = topics.replaceAll("}{",", ");
	topics = topics.replaceAll("{",'');
	topics = topics.replaceAll("}",'');
	$('#view_topics').val(topics);
});
