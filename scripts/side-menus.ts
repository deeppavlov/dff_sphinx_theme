import {closest, scrollTop} from "./_utilities";



export function bindSideMenus() {
    const rightMenuLinks = $("#pytorch-right-menu li");
    const rightMenuHasLinks = rightMenuLinks.length > 1;

    if (!rightMenuHasLinks) {
        for (let i = 0; i < rightMenuLinks.length; i++) {
            rightMenuLinks[i].style.display = "none";
        }
    }

    if (rightMenuHasLinks) {
        // Don't show the Shortcuts menu title text unless there are menu items
        $("#pytorch-shortcuts-wrapper")[0].style.display = "block";

        // We are hiding the titles of the pages in the right side menu but there are a few
        // pages that include other pages in the right side menu (see 'torch.nn' in the docs)
        // so if we exclude those it looks confusing. Here we add a 'title-link' class to these
        // links so we can exclude them from normal right side menu link operations
        const titleLinks = $("#pytorch-right-menu #pytorch-side-scroll-right > ul > li > a.reference.internal");

        for (let i = 0; i < titleLinks.length; i++) {
            const link = titleLinks[i];

            link.classList.add("title-link");

            if (link.nextElementSibling && link.nextElementSibling.tagName === "UL" && link.nextElementSibling.children.length > 0) {
                link.classList.add("has-children");
            }
        }

        // Add + expansion signifiers to normal right menu links that have sub menus
        const menuLinks = $("#pytorch-right-menu ul li ul li a.reference.internal");

        for (let j = 0; j < menuLinks.length; j++) {
            if (menuLinks[j].nextElementSibling && menuLinks[j].nextElementSibling.tagName === "UL") {
                menuLinks[j].classList.add("not-expanded");
            }
        }

        // If a hash is present on page load recursively expand menu items leading to selected item
        const linkWithHash = $("#pytorch-right-menu a[href=\"" + window.location.hash + "\"]")[0];

        if (linkWithHash) {
            // Expand immediate sibling list if present
            if (linkWithHash.nextElementSibling && linkWithHash.nextElementSibling.tagName === "UL" && linkWithHash.nextElementSibling.children.length > 0) {
                (linkWithHash.nextElementSibling as HTMLElement).style.display = "block";
                linkWithHash.classList.add("expanded");
            }

            // Expand ancestor lists if any
            expandClosestUnexpandedParentList(linkWithHash);
        }

        // Bind click events on right menu links
        $("#pytorch-right-menu a.reference.internal").on("click", function() {
            const nextSibling = this.nextElementSibling as HTMLElement;
            if (this.classList.contains("expanded")) {
                nextSibling.style.display = "none";
                this.classList.remove("expanded");
                this.classList.add("not-expanded");
            } else if (this.classList.contains("not-expanded")) {
                nextSibling.style.display = "block";
                this.classList.remove("not-expanded");
                this.classList.add("expanded");
            }
        });
    }

    handleNavBar();
}

export function handleNavBar() {
    const scroll = scrollTop();

    const levelBar = $("#pytorch-page-level-bar")[0];
    const leftMenu = $("#pytorch-left-menu")[0];
    const rightMenu = $("#pytorch-right-menu")[0];
    const container = $("#pytorch-content-wrap")[0];

    const mainHeaderHeight = $('#header-holder')[0].offsetHeight;
    const containerLeft = container.getBoundingClientRect().left;
    const containerRight = $(".pytorch-content-left")[0].getBoundingClientRect().right;
    const containerWidth = container.getBoundingClientRect().width;

    // If we are scrolled past the main navigation header fix the sub menu bar to top of page
    if (scroll >= mainHeaderHeight && !levelBar.classList.contains("left-menu-is-fixed")) {
        leftMenu.classList.add("make-fixed");
        rightMenu.classList.add("make-fixed");
        levelBar.classList.add("left-menu-is-fixed");

        rightMenu.style.left = `${containerRight}px`;
        const levelBarBottom = levelBar.getBoundingClientRect().bottom;
        rightMenu.style.top = `${levelBarBottom}px`;
        rightMenu.style.height = `${window.innerHeight - levelBarBottom}px`;
    } else if (scroll < mainHeaderHeight && levelBar.classList.contains("left-menu-is-fixed")) {
        leftMenu.classList.remove("make-fixed");
        rightMenu.classList.remove("make-fixed");
        levelBar.classList.remove("left-menu-is-fixed");

        rightMenu.style.left = "";
        rightMenu.style.top = "";
        rightMenu.style.height = "";
    }

    if (scroll < mainHeaderHeight) {
        leftMenu.style.height = `${window.innerHeight - mainHeaderHeight + scroll}px`;
        rightMenu.style.height = `${window.innerHeight - mainHeaderHeight - levelBar.offsetHeight + scroll}px`;
    } else {
        leftMenu.style.height = `${window.innerHeight}px`;
        rightMenu.style.height = `${window.innerHeight - levelBar.offsetHeight}px`;
    }
    rightMenu.style.width = `${containerWidth - containerRight + containerLeft}px`;
}

function expandClosestUnexpandedParentList(el: HTMLElement) {
    const closestParentList = closest(el, "ul");

    if (closestParentList) {
        const closestParentLink = closestParentList.previousElementSibling;
        const closestParentLinkExists = closestParentLink && closestParentLink.tagName === "A" && closestParentLink.classList.contains("reference");

        if (closestParentLinkExists) {
            // Don't add expansion class to any title links
            if (closestParentLink.classList.contains("title-link")) return;

            closestParentList.style.display = "block";
            closestParentLink.classList.remove("not-expanded");
            closestParentLink.classList.add("expanded");
            expandClosestUnexpandedParentList(closestParentLink as HTMLElement);
        }
    }
}
