var grid_row_template = '<div class="grid_row"></div>'
var pixel_template = '<div class="pixel_container off"><div class="pixel_base"><div class="p_top"></div><div class="p_bottom"></div></div><div class="pixel_paddle"><div></div></div></div>'
var current_x = 0; current_y = 0;




$(document).ready(function() {
    // setup dimensions if necessary
    var container = $('#control > #interaction_area');
    var shifter_width = container.find('.shifter > .page').length * container.width();
    $('#control > #interaction_area > .shifter').width(shifter_width);

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
    $('a#reset').click(resetGrid);

    // Start the game
    initiateGame();
});

function resetGrid() {
    $('.pixel_container').addClass('off').removeClass('current').removeClass('end_point').removeClass('option');
    initiateGame();
}

function initiateGame() {
    var start_x = randInt(0, 10);
    var start_y = randInt(0, 10);
    $('#point_a > #x > .val').text(String(start_x));
    $('#point_a > #y > .val').text(String(start_y));
    setCurrent(start_x, start_y);

    var end_x = randInt(start_x + 5, 19);
    var end_y = randInt(start_y + 1, start_y + (end_x - start_x));
    $('#point_b > #x > .val').text(String(end_x));
    $('#point_b > #y > .val').text(String(end_y));
    getPixel(end_x, end_y).addClass('end_point').removeClass('off');
}

function setCurrent(x, y) {
    current_x = x; current_y = y;
    $('.pixel_container.current').removeClass('current');
    getPixel(x, y).addClass('current').removeClass('off');
    getPixel(x + 1, y).addClass('option');
    getPixel(x + 1, y + 1).addClass('option');
}

function getPixel(x, y) {
    if (y > 19) {y = 19};
    if (x > 19) {x = 19};
    var selector = '.pixel_container[y=' + String(y) + '][x=' + String(x) + ']';
    return $(selector);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
