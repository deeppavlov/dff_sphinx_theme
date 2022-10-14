import {closest, headersHeight} from "./_utilities";



let HISTORY_SUPPORT;

const ANCHOR_REGEX = /^#[^ ]+$/;

function offsetHeightPx(): number {
    const OFFSET_HEIGHT_PADDING = 20;
    // TODO: this is a little janky. We should try to not rely on JS for this
    return headersHeight() + OFFSET_HEIGHT_PADDING;
}

/**
 * Return the offset amount to deduct from the normal scroll position.
 * Modify as appropriate to allow for dynamic calculations
 */
function getFixedOffset() {
    return offsetHeightPx();
}

/**
 * If the provided href is an anchor which resolves to an element on the
 * page, scroll to it.
 * @param  {String} href
 * @param  {Boolean} pushToHistory
 * @return {Boolean} - Was the href an anchor.
 */
function scrollIfAnchor(href: string, pushToHistory: boolean = false) {
    let match, anchorOffset;

    if(!ANCHOR_REGEX.test(href)) {
        return false;
    }

    match = document.getElementById(href.slice(1));

    if (match) {
        anchorOffset = $(match).offset().top - getFixedOffset();

        $('html, body').scrollTop(anchorOffset);

        // Add the state to history as-per normal anchor links
        if (HISTORY_SUPPORT && pushToHistory) {
            history.pushState({}, document.title, location.pathname + href);
        }
    }

    return !!match;
}

/**
 * Attempt to scroll to the current location's hash.
 */
function scrollToCurrent(e: Event | null = null) {
    if (scrollIfAnchor(window.location.hash) && !!e) {
        e.preventDefault();
    }
}

export function delegateSpans(e: Event) {
    const elem = closest(e.target as HTMLElement, "a");
    if (scrollIfAnchor(elem.getAttribute('href'), true)) {
        e.preventDefault();
    }
}

/**
 * If the click event's target was an anchor, fix the scroll position.
 */
export function delegateAnchors(e: Event) {
    const elem = e.target as HTMLElement;
    if (scrollIfAnchor(elem.getAttribute('href'), true)) {
        e.preventDefault();
    }
}

// Modified from https://stackoverflow.com/a/13067009
// Going for a JS solution to scrolling to an anchor so we can benefit from
// less hacky css and smooth scrolling.
/**
 * Establish events, and fix initial scroll position if a hash is provided.
 */
export function bindScrollToAnchor() {
    HISTORY_SUPPORT = !!(history && history.pushState);
    scrollToCurrent();
}
