//Check off Specific ToDos by clicking
 $("ul").on("click", "li", function(){
     $(this).toggleClass('completed');
 });

//Click on the X to delete ToDo
$("ul").on("click", "span", function(e){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    e.stopPropagation();
});

$("input[type='text']").keypress(function(e) {
    if(e.which === 13) {

        //grabbing new todo text from input
        const todoText = $(this).val();
        //clear the input
        $(this).val("");

        //create a new li and add to ul
        $("ul").append(`<li><span>X</span> ${todoText}</li>`);


    }
})
