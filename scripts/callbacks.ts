import {throttle} from "./_utilities";
import {highlight} from "./highlight-navigation";
import {delegateAnchors, delegateSpans} from "./scroll-to-anchor";
import {handleNavBar} from "./side-menus";
import {hashChange, onResize, onScroll, reset, toggleCurrent} from "./theme";



$(window).on("scroll", function () {
    const article = ".section";

    $(article).each(function (i) {
        const offsetScroll = $(this).offset().top - $(window).scrollTop();
        const id = "#" + $(this).attr("id");
        if (offsetScroll <= topMenuHeight + 200 && offsetScroll >= topMenuHeight - 200 && scrollItems[i] === id && $(".hidden:visible")) {
            $(menuItems).removeClass("side-scroll-highlight");
            $(menuItems[i]).addClass("side-scroll-highlight");
        }
    });

    throttle(highlight, 100)();
});

$(window).on('resize scroll', handleNavBar);

$('body').on('click', 'a', delegateAnchors).on('click', '#pytorch-right-menu li span', delegateSpans);



const withStickyNav = document.currentScript.getAttribute('enable') === "true";

$(window).on('hashchange', reset);

if (withStickyNav) {
    // Set scroll monitor
    $(window).on('scroll', onScroll);
}

// Set resize monitor
$(window).on('resize', onResize);

// Set up javascript UX bits
$(document)
    // Shift nav in mobile when clicking the menu.
    .on('click', "[data-toggle='pytorch-left-menu-nav-top']", function() {
        $("[data-toggle='wy-nav-shift']").toggleClass("shift");
    })
    // Nav menu link click operations
    .on('click', ".pytorch-menu-vertical .current ul li a", function() {
        const target = $(this);
        // Close menu when you click a link.
        $("[data-toggle='wy-nav-shift']").removeClass("shift");
        // Handle dynamic display of l3 and l4 nav lists
        toggleCurrent(target);
        hashChange();
    })
    // Jump back to top on pagination click
    .on("click", ".page", function() {
        $('html, body').animate({scrollTop: $("#dropdown-filter-tags").position().top}, 'slow');
    });
