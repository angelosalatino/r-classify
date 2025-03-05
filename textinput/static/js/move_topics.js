$(document).on("click", ".topics", function(e) {
    e.preventDefault();

    const list1 = document.getElementById("list1");
    const list2 = document.getElementById("list2");
    const moveTo = this.closest("#list1") ? list2 : list1;

    moveTo.appendChild(this.parentElement);
    $(this).find('i.grab').toggleClass('fa-minus-circle fa-plus-circle');

    const formula = $('#list2 li span').map(function() {
        return `{${$(this).html()}}`;
    }).get();

    const topics = formula.join('').replaceAll("}{", ", ").replaceAll("{", '').replaceAll("}", '');

    $('#basedatadrag').val(formula.join(''));
    $('#view_topics').val(topics);
});
