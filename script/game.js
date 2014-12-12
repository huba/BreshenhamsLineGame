var grid_row_template = '<div class="grid_row"></div>'
var pixel_template = '<div class="pixel_container off"><div class="pixel_base"><div class="p_top"></div><div class="p_bottom"></div></div><div class="pixel_paddle"><div></div></div></div>'

var start_x = 0; start_y = 0;
var current_x = 0; current_y = 0;
var end_x = 0; end_y = 0;

var A = 0; B = 0; P = 0;

var A_eq_init = 'A = 2 &times (y<span class="subscript">2</span> - y<span class="subscript">1</span>)';
var B_eq_init = 'B = A - 2 &times (x<span class="subscript">2</span> - x<span class="subscript">1</span>)';
var P_eq_init = 'P = A - (x<span class="subscript">2</span> - x<span class="subscript">1</span>)';


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

    // SET UP GUIDE SLIDESHOW =============================
    $guide_bubble = $('#control > #information_area > #speech_bubble')
    var guide = $guide_bubble.slideshow({});

    // generic next-previous buttons...
    $guide_bubble.find('.page > .button_area > #lb').click(guide.prev_page);
    $guide_bubble.find('.page > .button_area > #rb').click(guide.next_page);

    // INTRO_0 EVENTS ===========================
    $guide_bubble.find('#intro_0').each(function() {
        var intro_0 = this;
        $(intro_0).on('show', function() {
            $guide_bubble.addClass('overtake');
        });

        $(intro_0).find('.button_area > #lb').off('click').click(function() {
            guide.set_page('#good_luck');
        });
    });
    // ==========================================

    // INTRO_1 EVENTS ===========================
    $guide_bubble.find('#intro_1').each(function() {
        var intro_1 = this;
        $(intro_1).on('show', initiate_game);
    });
    // ==========================================

    // INTRO_2 EVENTS ===========================
    $guide_bubble.find('#intro_2').each(function() {
        var intro_2 = this;
        $(intro_2).on('show', function() {

        });
    });
    // ==========================================

    // INTRO_3 EVENTS ===========================
    $guide_bubble.find('#intro_3').each(function() {
        var intro_3 = this;
    });
    // ==========================================

    // ITERATION EVENTS =========================
    $guide_bubble.find('#iteration').each(function() {
        var iteration = this;
        $(iteration).on('show', function() {
            $(this).find('p').hide();
            $(this).find('.formula > #A_equation').html('A = ' + A);
            $(this).find('.formula > #B_equation').html('B = ' + B);
            $(this).find('.formula > #P_equation').html('P = ' + P);
        })

        $(iteration).find('.button_area > #lb').off().click(function() {
            while (!getCurrent().hasClass('end_point')) {
                if (P < 0) {
                    P += A;
                    var next = $('.pixel_container.option.inline');
                } else {
                    P += B;
                    var next = $('.pixel_container.option.above');
                }

                var n_x = parseInt(next.attr('x')); n_y = parseInt(next.attr('y'));
                setCurrent(n_x, n_y);
            }
        });

        $(iteration).find('.button_area > #rb').off().click(function() {
            if (getCurrent().hasClass('end_point')) {
                // this is the end...
                $guide_bubble.next_page();
            } else {
                // more lies ahead.
                if (P < 0) {
                    P += A;
                    var next = $('.pixel_container.option.inline');
                } else {
                    P += B;
                    if (P == 0) {
                    } else {
                    }
                    var next = $('.pixel_container.option.above');
                }

                var n_x = parseInt(next.attr('x')); n_y = parseInt(next.attr('y'));
                setCurrent(n_x, n_y);
            }
        });
    });
    // ==========================================

    // FINAL_NOTE EVENTS ========================
    $guide_bubble.find('#final_note').each(function() {
        var final_note = this;
        $(final_note).find('.button_area > #lb').off().click(function() {
            guide.set_page('#intro_1');
        });
    });
    // ==========================================

    // GOOD_LUCK EVENTS =========================
    $guide_bubble.find('#good_luck').each(function() {
        var good_luck = this;
        $(good_luck).on('show', function() {
            $guide_bubble.removeClass('overtake');
        })
    });
    // ==========================================
    // ====================================================

    // Start guide
    guide.set_page('#intro_0');
});

function initiate_game() {
    /*
    This function generates the starting points.
    */
    // First clear everything
    $('.pixel_container').addClass('off').removeClass('current').removeClass('end_point').removeClass('option');

    // Then randomize the start point
    start_x = randInt(0, 10);
    start_y = randInt(0, 10);
    $('.coordinate#x1').html('$$x_{1}=' + start_x + '$$');
    $('.coordinate#y1').html('$$y_{1}=' + start_y + '$$');
    setCurrent(start_x, start_y);

    // And randomize the endpoint based on the startpoint
    end_x = randInt(start_x + 5, 19);
    end_y = randInt(start_y + 1, start_y + (end_x - start_x));
    $('.coordinate#x2').html('$$x_{2}=' + end_x + '$$');
    $('.coordinate#y2').html('$$y_{2}=' + end_y + '$$');
    getPixel(end_x, end_y).addClass('end_point').removeClass('off');

    $('.coordinate').parseMath();
}

function setCurrent(x, y) {
    /*
    Sets the pixel at given coordinate to current;
    */
    current_x = x; current_y = y;
    $('.pixel_container.current').removeClass('current');
    $('.pixel_container.option').removeClass('above').removeClass('inline').removeClass('option');

    if (!getCurrent().hasClass('end_point')){
        getPixel(x, y).addClass('current').removeClass('off');
        getPixel(x + 1, y).addClass('option').addClass('inline');
        getPixel(x + 1, y + 1).addClass('option').addClass('above');
    }
}

function getPixel(x, y) {
    /*
    Function that accesses the pixel at a given coordinate
    */
    // if (y > 19) {y = 19};
    // if (x > 19) {x = 19};
    var selector = '.pixel_container[y=' + String(y) + '][x=' + String(x) + ']';
    return $(selector);
}

function getCurrent() {
    var selector = '.pixel_container[y=' + String(current_y) + '][x=' + String(current_x) + ']';
    return $(selector);
}

function randInt(min, max) {
    /*
    Random integer within range
    */
    return Math.floor(Math.random() * (max - min) + min);
}
