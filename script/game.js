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

    // Assign callbacks
    // INTRO 0 CALLBACKS ============
    function intro_0_enter() {

    }

    $('#intro_0 > .button_area > a#right').click(intro_1_enter);

    $('#intro_0 > .button_area > a#left').click(good_luck_enter);
    // ==============================

    // INTRO 1 CALLBACKS ============
    function intro_1_enter() {
        setSpeechBubble('intro_1');
        initiateGame();
    }

    $('#intro_1 > .button_area > a#right').click(intro_2_enter);
    // ==============================

    // INTRO 2 CALLBACKS ============
    function intro_2_enter() {
        setSpeechBubble('intro_2')

        $('.page#intro_2 > div.formula > #A_equation').html(A_eq_init);
        $('.page#intro_2 > div.formula > #B_equation').html(B_eq_init);
        $('.page#intro_2 > div.formula > #P_equation').html(P_eq_init);

        var interval = 500;

        // animation for solving A
        setTimeout(function() {
            $('.page#intro_2 > div.formula > #A_equation').animate({opacity: '0'}, function() {
                $('.page#intro_2 > div.formula > #A_equation').html('A = 2 &times ('+ end_y + ' - ' + start_y +')');
            });
            $('.page#intro_2 > div.formula > #A_equation').animate({opacity: '1'}, function() {
                setTimeout(function() {
                    $('.page#intro_2 > div.formula > #A_equation').animate({opacity: '0'}, function() {
                        $('.page#intro_2 > div.formula > #A_equation').html('A = 2 &times '+ (end_y - start_y));
                    });
                    $('.page#intro_2 > div.formula > #A_equation').animate({opacity: '1'}, function() {
                        setTimeout(function() {
                            A = 2 * (end_y - start_y);
                            $('.page#intro_2 > div.formula > #A_equation').animate({opacity: '0'}, function() {
                                $('.page#intro_2 > div.formula > #A_equation').html('A = ' + A);
                            });
                            $('.page#intro_2 > div.formula > #A_equation').animate({opacity: '1'}, function() {
                                // Animation for solving B
                                setTimeout(function() {
                                    $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '0'}, function() {
                                        $('.page#intro_2 > div.formula > #B_equation').html('B = A - 2 &times ('+ end_x + ' - ' + start_x +')');
                                    });
                                    $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '1'}, function() {
                                        setTimeout(function() {
                                            $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '0'}, function() {
                                                $('.page#intro_2 > div.formula > #B_equation').html('B = ' + A + ' - 2 &times ' + (end_x - start_x));
                                            });
                                            $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '1'}, function() {
                                                setTimeout(function() {
                                                    $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '0'}, function() {
                                                        $('.page#intro_2 > div.formula > #B_equation').html('B = ' + A + ' - ' + (2*(end_x - start_x)));
                                                    });
                                                    $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '1'}, function() {
                                                        setTimeout(function() {
                                                            B = A - 2 * (end_x - start_x)
                                                            $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '0'}, function() {
                                                                $('.page#intro_2 > div.formula > #B_equation').html('B = ' + B);
                                                            });
                                                            $('.page#intro_2 > div.formula > #B_equation').animate({opacity: '1'}, function() {
                                                                setTimeout(function() {
                                                                    // Animate solving for P
                                                                    $('.page#intro_2 > div.formula > #P_equation').animate({opacity: '0'}, function() {
                                                                        $('.page#intro_2 > div.formula > #P_equation').html('P = ' + A + ' - (' + end_x + ' - ' + start_x + ')');
                                                                    });
                                                                    $('.page#intro_2 > div.formula > #P_equation').animate({opacity: '1'}, function() {
                                                                        setTimeout(function() {
                                                                            $('.page#intro_2 > div.formula > #P_equation').animate({opacity: '0'}, function() {
                                                                                $('.page#intro_2 > div.formula > #P_equation').html('P = ' + A + ' - ' + (end_x - start_x));
                                                                            });
                                                                            $('.page#intro_2 > div.formula > #P_equation').animate({opacity: '1'}, function() {
                                                                                P = A - (end_x - start_x);
                                                                                setTimeout(function() {
                                                                                    $('.page#intro_2 > div.formula > #P_equation').animate({opacity: '0'}, function() {
                                                                                        $('.page#intro_2 > div.formula > #P_equation').html('P = ' + P);
                                                                                    });
                                                                                    $('.page#intro_2 > div.formula > #P_equation').animate({opacity: '1'}, function() {
                                                                                        // Yo dawg. I herd u liked callbacks so we put callbacks into ur
                                                                                        // callbacks so u can call back after u called back.
                                                                                        // TODO: make this a bit less nested.
                                                                                        $('.page#intro_2 > div.button_area').fadeIn();
                                                                                    });
                                                                                }, interval);
                                                                            });
                                                                        }, interval);
                                                                    });
                                                                }, interval);
                                                            });
                                                        }, interval);
                                                    });
                                                }, interval);
                                            });
                                        }, interval);
                                    });
                                }, interval);
                            });
                        }, interval);
                    });
                }, interval);
            });
        }, 2000);
    }

    $('#intro_2 > .button_area > a#right').click(intro_3_enter);
    // ==============================

    // INTRO 3 CALLBACKS ============
    function intro_3_enter() {
        $('#intro_2 > .button_area').hide();
        setSpeechBubble('intro_3');
    }

    $('#intro_3 > .button_area > a#right').click(iteration_enter);
    // ==============================

    // ITERATION CALLBACKS ==========
    function iteration_enter() {
        setSpeechBubble('iteration');
        $('.page#iteration > p').hide();

        $('.page#iteration > div.formula > #A_equation').html('A = ' + A);
        $('.page#iteration > div.formula > #B_equation').html('B = ' + B);
        $('.page#iteration > div.formula > #P_equation').html('P = ' + P);
    }

    $('#iteration > .button_area > a#right').click(function() {
        $('.page#iteration > p').hide();
        if (getCurrent().hasClass('end_point')) {
            // this is the end...
            final_note_enter();
        } else {
            // more lies ahead.
            if (P < 0) {
                P += A;
                $('.page#iteration > p#smaller').fadeIn();
                var next = $('.pixel_container.option.inline');
            } else {
                P += B;
                if (P == 0) {
                    $('.page#iteration > p#equal').fadeIn();
                } else {
                    $('.page#iteration > p#greater').fadeIn();
                }
                var next = $('.pixel_container.option.above');
            }

            $('.page#iteration > div.formula > #P_equation').animate({opacity: '0'}, 1500, function() {
                $('.page#iteration > div.formula > #P_equation').html('P = ' + P);
                $('.page#iteration > div.formula > #P_equation').animate({opacity: '1'});
                $('.page#iteration > p').fadeOut(3000);
            });

            var n_x = parseInt(next.attr('x')); n_y = parseInt(next.attr('y'));
            setCurrent(n_x, n_y);
        }

        if (getCurrent().hasClass('end_point')) {
            $('#iteration > .button_area > a#left').fadeOut();
            $('#iteration > .button_area > a#right').animate({'border-top-left-radius': '5px', 'border-bottom-left-radius': '5px'});
            $('.page#iteration > p').hide();
        }
    });

    $('#iteration > .button_area > a#left').click(function() {
        $('.page#iteration > p').hide();
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

        setCurrent(end_x, end_y);
        $('#iteration > .button_area > a#left').fadeOut();
        $('#iteration > .button_area > a#right').animate({'border-top-left-radius': '5px', 'border-bottom-left-radius': '5px'});
    });
    // ==============================

    // FINAL NOTE CALLBACKS =========
    function final_note_enter() {
        setSpeechBubble('final_note');
        $('#iteration > .button_area > a#left').show();
        $('#iteration > .button_area > a#right').animate({'border-top-left-radius': '0px', 'border-bottom-left-radius': '0px'});
    }

    $('#final_note > .button_area > a#left').click(intro_1_enter);

    $('#final_note > .button_area > a#right').click(good_luck_enter);
    // ==============================

    // GOOD LUCK CALLBACKS ==========
    function good_luck_enter() {
        setSpeechBubble('good_luck');
    }
    // ==============================

    // Start the game
    setSpeechBubble('intro_0');
    intro_0_enter();
});

function setSpeechBubble(id) {
    // Firstly deactivate all speech bubble contents
    $('#control > #information_area > #speech_bubble > .page.active').removeClass('active');

    // Then activate new content
    $('#control > #information_area > #speech_bubble > .page#' + id).addClass('active');

    if ($('#control > #information_area > #speech_bubble > .page.active').attr('overtake') == 'true') {
        $('#control > #information_area > #speech_bubble').addClass('overtake');
    } else {
        $('#control > #information_area > #speech_bubble').removeClass('overtake');
    }
}

function initiateGame() {
    /*
    This function generates the starting points.
    */
    // First clear everything
    $('.pixel_container').addClass('off').removeClass('current').removeClass('end_point').removeClass('option');

    // Then randomize the start point
    start_x = randInt(0, 10);
    start_y = randInt(0, 10);
    $('#point_a > #x > .val').text(String(start_x));
    $('#point_a > #y > .val').text(String(start_y));
    setCurrent(start_x, start_y);

    // And randomize the endpoint based on the startpoint
    end_x = randInt(start_x + 5, 19);
    end_y = randInt(start_y + 1, start_y + (end_x - start_x));
    $('#point_b > #x > .val').text(String(end_x));
    $('#point_b > #y > .val').text(String(end_y));
    getPixel(end_x, end_y).addClass('end_point').removeClass('off');
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
    console.log(selector);
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
