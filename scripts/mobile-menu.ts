export function bindMobileMenu() {
    $("[data-behavior='open-mobile-menu']").on('click', function(e) {
        e.preventDefault();
        $(".mobile-main-menu").addClass("open");
        $("body").addClass('no-scroll');

        listenForResize();
    });

    $("[data-behavior='close-mobile-menu']").on('click', function(e) {
        e.preventDefault();
        close();
    });
}

function listenForResize() {
    $(window).on('resize.ForMobileMenu', function() {
        if ($(this).width() > 768) close();
    });
}

function close() {
    $(".mobile-main-menu").removeClass("open");
    $("body").removeClass('no-scroll');
    $(window).off('resize.ForMobileMenu');
}
