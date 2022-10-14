export function scrollTop(): number {
    const supportPageOffset = window.scrollX !== undefined;
    const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    return supportPageOffset ? window.scrollY : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
}

interface ThrottleOptions {
    leading?: boolean;
    trailing?: boolean;
}

// Modified from https://stackoverflow.com/a/27078401
export function throttle(func: () => void, wait: number, options: ThrottleOptions = {}) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};

    const later = () => {
        previous = options['leading'] === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    return () => {
        const now = Date.now();
        if (!previous && options['leading'] === false) previous = now;
        const remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options['trailing'] !== false) timeout = setTimeout(later, remaining);

        return result;
    };
}

export function closest(el: HTMLElement, selector: string): HTMLElement | null {
    let matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    let parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}

interface Offset {
    top: number;
    left: number;
}

// Modified from https://stackoverflow.com/a/18953277
export function offset(elem: HTMLElement): Offset {
    if (!elem) return;

    const rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none) or disconnected
    if (rect.width || rect.height || elem.getClientRects().length) {
        const doc = elem.ownerDocument;
        const docElem = doc.documentElement;

        return {
            top: rect.top + window.scrollY - docElem.clientTop,
            left: rect.left + window.scrollX - docElem.clientLeft
        };
    }
}

export function headersHeight(): number {
    if ($("#pytorch-left-menu")[0].classList.contains("make-fixed")) return $("#pytorch-page-level-bar")[0].offsetHeight;
    else return $("#header-holder")[0].offsetHeight + $("#pytorch-page-level-bar")[0].offsetHeight;
}
