var grid_row_template = '<div class="grid_row"></div>'
var pixel_template = '<div class="pixel_container off"><div class="pixel_base"><div class="p_top"></div><div class="p_bottom"></div></div><div class="pixel_paddle"><div></div></div></div>'

$(document).ready(function() {
    // add grid rows
    for (var i = 0; i < 20; i++) {
        var grid_row = $(grid_row_template).attr('y', 19 - i);
        $('#grid').append(grid_row);
    }

    // generate each row
    $('#grid .grid_row').each(function() {
        var y = $(this).attr('y');
        for (var j = 0; j < 20; j++) {
            var pixel = $(pixel_template).attr('y', y).attr('x', j);
            $(this).append(pixel);
        }
    });

    // Assign callbacks
    $('.pixel_container').click(function() {
        $(this).toggleClass('off')
    });

    $('a#reset').click(resetGrid);

    // Start the game
    initiateGame();
});

function resetGrid() {
    $('.pixel_container').addClass('off').removeClass('current').removeClass('end_point');
    initiateGame();
}

function initiateGame() {
    var start_x = randInt(0, 10);
    var start_y = randInt(0, 10);
    getPixel(start_x, start_y).addClass('current').removeClass('off');

    var end_x = randInt(start_x + 5, 19);
    var end_y = randInt(start_y + 1, start_y + (end_x - start_x));
    getPixel(end_x, end_y).addClass('end_point').removeClass('off');
}

function getPixel(x, y) {
    var selector = '.pixel_container[y=' + String(y) + '][x=' + String(x) + ']';
    return $(selector);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
