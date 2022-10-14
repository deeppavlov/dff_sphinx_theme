/**
 * Final redaction
 **/

const banner: JQuery = $(".cookie-banner-wrapper");

export function initCookieBanner() {
    $(".close-button").on("click", hideCookieNotice);
    if (!cookieExists()) {
        setCookie();
        showCookieNotice();
    }
}

const cookieExists = (): boolean => !!localStorage.getItem("returningPytorchUser");

const setCookie = () => localStorage.setItem("returningPytorchUser", "true");

const showCookieNotice = () => banner.addClass("is-visible");

const hideCookieNotice = () => banner.removeClass("is-visible");
