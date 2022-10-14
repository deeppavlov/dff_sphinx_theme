import {scrollTop, offset, closest} from "./_utilities";



// Modified from https://stackoverflow.com/a/32396543

const navigationListItems: JQuery = $("#pytorch-right-menu li");
const sections: JQuery = $(".pytorch-article section");
const sectionIdToNavigationLink = {};

export function bindHighlightNavigation() {
    for (let i = 0; i < sections.length; i++) {
        const id = sections[i].id;
        sectionIdToNavigationLink[id] = $('#pytorch-right-menu li a[href="#' + id + '"]')[0];
    }
}

export function highlight() {
    const rightMenu = $("#pytorch-right-menu")[0];

    // If right menu is not on the screen don't bother
    if (rightMenu.offsetWidth === 0 && rightMenu.offsetHeight === 0) return;

    const scrollPosition = scrollTop();
    const OFFSET_TOP_PADDING = 25;
    const off = $("#header-holder")[0].offsetHeight + $("#pytorch-page-level-bar")[0].offsetHeight + OFFSET_TOP_PADDING;

    for (let i = (sections.length - 1); i >= 0; i--) { // FIXME!
        const currentSection = sections[i];
        const sectionTop = offset(currentSection).top;

        if (scrollPosition >= sectionTop - off) {
            const navigationLink = sectionIdToNavigationLink[currentSection.id];
            const navigationListItem = closest(navigationLink, "li");

            if (navigationListItem && !navigationListItem.classList.contains("active")) {
                for (let j = 0; j < navigationListItems.length; j++) {
                    const el = navigationListItems[j];
                    if (el.classList.contains("active")) el.classList.remove("active");
                }

                navigationListItem.classList.add("active");

                // Scroll to active item. Not a requested feature but we could revive it. Needs work.

                // var menuTop = $("#pytorch-right-menu").position().top;
                // var itemTop = navigationListItem.getBoundingClientRect().top;
                // var TOP_PADDING = 20
                // var newActiveTop = $("#pytorch-side-scroll-right").scrollTop() + itemTop - menuTop - TOP_PADDING;

                // $("#pytorch-side-scroll-right").animate({
                //   scrollTop: newActiveTop
                // }, 100);
            }

            break;
        }
    }
}
