function toggleDropdown(menuToggle: string) {
    const showMenuClass = "show-menu";
    const menuClass = "." + menuToggle + "-menu";

    if ($(menuClass).hasClass(showMenuClass)) {
        $(menuClass).removeClass(showMenuClass);
    } else {
        $("[data-toggle=" + menuToggle + "].show-menu").removeClass(showMenuClass);
        $(menuClass).addClass(showMenuClass);
    }
}

export function bindMainMenuDropdown() {
    $("[data-toggle='ecosystem-dropdown']").on("click", function() {
        toggleDropdown($(this).attr("data-toggle"));
    });

    $("[data-toggle='resources-dropdown']").on("click", function() {
        toggleDropdown($(this).attr("data-toggle"));
    });
}
