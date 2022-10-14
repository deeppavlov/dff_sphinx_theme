// Sphinx theme nav state

let navBar: HTMLElement | null = null;
let winScroll: boolean = false;
let winResize: boolean = false;
let linkScroll: boolean = false;
let winPosition: number = 0;
let winHeight: number | null = null;
let docHeight: number | null = null;
let isRunning: boolean = false;

export function enableTheme() {
    if (isRunning) return;

    isRunning = true;
    init();
    reset();

    onResizeInner();
}

function init() {
    navBar = $('div.pytorch-side-scroll:first')[0];

    // Make tables responsive
    $("table.docutils:not(.field-list,.footnote,.citation)").wrap("<div class='wy-table-responsive'></div>");

    // Add extra class to responsive tables that contain
    // footnotes or citations so that we can target them for styling
    $("table.docutils.footnote").wrap("<div class='wy-table-responsive footnote'></div>");
    $("table.docutils.citation").wrap("<div class='wy-table-responsive citation'></div>");

    // Add expand links to all parents of nested ul
    $('.pytorch-menu-vertical ul').not('.simple').siblings('a').each(function () {
        const link = $(this);
        const expand = $('<span class="toctree-expand"></span>');

        expand.on('click', function (ev) {
            toggleCurrent(link);
            ev.stopPropagation();
            return false;
        });
        link.prepend(expand);
    });
}

export function reset() {
    // Get anchor from URL and open up nested nav
    const anchor = encodeURI(window.location.hash) || '#';

    try {
        const vmenu = $('.pytorch-menu-vertical');
        let link = vmenu.find('[href="' + anchor + '"]');

        if (link.length === 0) {
            // this link was not found in the sidebar.
            // Find associated id element, then its closest section
            // in the document and try with that one.
            const id_elt = $('.document [id="' + anchor.substring(1) + '"]');
            const closest_section = id_elt.closest('div.section');
            link = vmenu.find('[href="#' + closest_section.attr("id") + '"]');
            if (link.length === 0) {
                // still not found in the sidebar. fall back to main section
                link = vmenu.find('[href="#"]');
            }
        }

        // If we found a matching link then reset current and re-apply
        // otherwise retain the existing match
        if (link.length > 0) {
            $('.pytorch-menu-vertical .current').removeClass('current');
            link.addClass('current');
            link.closest('li.toctree-l1').addClass('current');
            link.closest('li.toctree-l1').parent().addClass('current');
            link.closest('li.toctree-l1').addClass('current');
            link.closest('li.toctree-l2').addClass('current');
            link.closest('li.toctree-l3').addClass('current');
            link.closest('li.toctree-l4').addClass('current');
        }
    } catch (err) {
        console.log("Error expanding nav for anchor", err);
    }
}

export function onScroll() {
    if (!linkScroll && !winScroll) {
        winScroll = true;
        requestAnimationFrame(function () {
            winScroll = false;
            const newWinPosition = $(window).scrollTop();
            const winBottom = newWinPosition + winHeight;
            if (navBar == null) return;
            const navPosition = navBar.scrollTop;
            const newNavPosition = navPosition + (newWinPosition - winPosition);
            if (newWinPosition < 0 || winBottom > docHeight) return;
            navBar.scrollTop = newNavPosition;
            winPosition = newWinPosition;
        });
    }
}

export function onResize() {
    if (!winResize) {
        winResize = true;
        requestAnimationFrame(() => onResize());
    }
}

function onResizeInner() {
    winResize = false;
    winHeight = $(window).height();
    docHeight = $(document).height();
}

export function hashChange() {
    linkScroll = true;
    $(window).one('hashchange', () => linkScroll = false);
}

export function toggleCurrent(elem: JQuery) {
    const parent_li = elem.closest('li');
    parent_li.siblings('li.current').removeClass('current');
    parent_li.siblings().find('li.current').removeClass('current');
    parent_li.find('> ul li.current').removeClass('current');
    parent_li.toggleClass('current');
}
