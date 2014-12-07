var grid_row_template = '<div class="grid_row"></div>'
var pixel_template = '<div class="pixel_container off"><div class="pixel_base"><div class="p_top"></div><div class="p_bottom"></div></div><div class="pixel_paddle"><div></div></div></div>'

$(document).ready(function() {
    // add grid rows
    for (var i = 0; i < 20; i++) {
        var grid_row = $(grid_row_template).attr('y', i);
        $('#grid').append(grid_row);
    }

    $('#grid .grid_row').each(function() {
        var y = $(this).attr('y');
        for (var j = 0; j < 20; j++) {
            var pixel = $(pixel_template).attr('y', y).attr('x', j);
            $(this).append(pixel);
        }
    });

    $('.pixel_container').click(function() {
        $(this).toggleClass('off')
    });
});

function resetGame() {
    $('.pixel_container').addClass('off');
}
