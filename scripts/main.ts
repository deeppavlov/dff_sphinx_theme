/**
 * Final redaction
 **/

import {initCookieBanner} from "./cookie-banner";
import {bindHighlightNavigation} from "./highlight-navigation";
import {bindFilterTags} from "./filter-tutorial-tags";
import {bindMainMenuDropdown} from "./main-menu-dropdown";
import {bindMobileMenu} from "./mobile-menu";
import {bindMobileTOC} from "./mobile-toc";
import {bindPytorchAnchors} from "./pytorch-anchors";
import {bindSideMenus} from "./side-menus";
import {bindScrollToAnchor} from "./scroll-to-anchor";
import {bindLeftNavItemsToggle} from "./left-nav-items-toggle";
import {enableTheme} from "./theme";

import "./immediates";
import "./callbacks";



$(function () {
    initCookieBanner();
    enableTheme();

    bindMobileMenu();
    bindMobileTOC();
    bindPytorchAnchors();
    bindSideMenus();
    bindScrollToAnchor();
    bindHighlightNavigation();
    bindMainMenuDropdown();
    bindFilterTags();
    bindLeftNavItemsToggle();

    $("article.pytorch-article a span.pre").each(function() {
        $(this).closest("a").addClass("has-code");
    });
});
