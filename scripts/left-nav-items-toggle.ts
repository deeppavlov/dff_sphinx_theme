/**
 * Final redaction
 **/

//This code handles the Expand/Hide toggle for the Docs/Tutorials left nav items

export function bindLeftNavItemsToggle() {
    $("#pytorch-left-menu p.caption").each((_, caption: HTMLElement) => {
        const menuName = caption.innerText.replace(/[^\w\s]/gi, "").trim();
        const savedValue = sessionStorage.getItem(menuName) ?? "expanded";

        $(caption).addClass(savedValue);
        $(caption).on("click", () => {
            const nextState = $(caption).hasClass("collapsed") ? "expanded" : "collapsed";
            $(caption).removeClass("expanded collapsed");
            sessionStorage.setItem(menuName, nextState);
            $(caption).addClass(nextState);
        });
    });
}