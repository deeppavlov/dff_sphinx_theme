export function bindMobileTOC() {
    $("[data-behavior='toggle-table-of-contents']").on("click", function(e) {
        e.preventDefault();

        const parent = $(this).parent();

        if (parent.hasClass("is-open")) {
            parent.removeClass("is-open");
            $(".pytorch-left-menu").slideUp(200, () => $(this).css({display: ""}));
        } else {
            parent.addClass("is-open");
            $(".pytorch-left-menu").slideDown(200);
        }
    });
}
