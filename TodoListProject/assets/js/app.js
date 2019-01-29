//Check off Specific ToDos by clicking
$("li").click(function(){
    $(this).toggleClass('completed');
});

//Click on the X to delete ToDo
$("span").click(function(e){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    e.stopPropagation();
});