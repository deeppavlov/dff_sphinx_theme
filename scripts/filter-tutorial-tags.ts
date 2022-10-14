import type List from "list.js";



export function bindFilterTags() {
    const options = {
      valueNames: [{ data: ["tags"] }],
      page: "6",
      pagination: true
    };

    // @ts-ignore NB! List.js library is included previously via CDN.
    const tutorialList = new window.List("tutorial-cards", options);

    $(".filter-btn").on("click", function() {
      if ($(this).data("tag") === "all") {
        $(this).addClass("all-tag-selected");
        $(".filter").removeClass("selected");
      } else {
        $(this).toggleClass("selected");
        $("[data-tag='all']").removeClass("all-tag-selected");
      }

      // If no tags are selected then highlight the 'All' tag

      if (!$(".selected")) {
        $("[data-tag='all']").addClass("all-tag-selected");
      }

      updateList(tutorialList);
    });
}

function filterSelectedTags(cardTags, selectedTags) {
    return cardTags.some((tag) => selectedTags.some((selectedTag) => selectedTag === tag));
}

function updateList(tutorialList: List) {
    const selectedTags = [];

    $(".selected").each(function() {
        selectedTags.push($(this).data("tag"));
    });

    tutorialList.filter(function(item) {
        let cardTags;

        const tags = item.values()['tags'];
        if (tags == null) cardTags = [""];
        else cardTags = tags.split(",");

        if (selectedTags.length === 0) return true;
        else return filterSelectedTags(cardTags, selectedTags);
    });
}
