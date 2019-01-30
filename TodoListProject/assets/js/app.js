//Check off Specific ToDos by clicking
 $("ul").on("click", "li", function(){
     $(this).toggleClass('completed');
 });

//Click on the X to delete ToDo
$("ul").on("click", "span", function(e){
    $(this).parent().slideToggle(100, function(){
        $(this).remove();
    });
    e.stopPropagation();
});

$("input[type='text']").keypress(function(e) {
    if(e.which === 13 && $(this).val() !== "") {
        //grabbing new todo text from input
        const todoText = $(this).val();
        //clear the input
        $(this).val("");
        //create a new li and add to ul
        $(`<li><span><i class="fas fa-trash"></i></span> ${todoText}</li>`).appendTo("ul").hide().slideDown(100);
    }
})

$(".fa-plus").click(function() {
    $("input[type='text']").slideToggle(100);
})