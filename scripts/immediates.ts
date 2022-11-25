$(".sphx-glr-thumbcontainer").removeAttr("tooltip");
$("table").removeAttr("border");



// This code replaces the default sphinx gallery download buttons
// with the 3 download buttons at the top of the page

const ctal = $(".pytorch-call-to-action-links");
if (ctal.length && ctal.is(":visible")) {
    const tutorialType = $("#tutorial-type");
    const tutorialName = tutorialType.data('name');
    const tutorialPath = tutorialType.data('path');
    const tutorialUrl = tutorialType.data('github');

    const githubLink = `https://github.com/${tutorialUrl}/blob/master/${tutorialPath}/${tutorialName}.py`;
    const notebookLink = `../${tutorialPath}/${tutorialName}.ipynb`;
    const colabLink = `https://colab.research.google.com/github/${tutorialUrl}/blob/gh-pages/${tutorialPath}/${tutorialName}.ipynb`;

    $("#google-colab-link").wrap(`<a href=${colabLink} data-behavior='call-to-action-event' data-response='Run in Google Colab' target='_blank'/>`);
    $("#download-notebook-link").wrap(`<a href=${notebookLink} data-behavior='call-to-action-event' data-response='Download Notebook'/>`);
    $("#github-view-link").wrap(`<a href=${githubLink} data-behavior='call-to-action-event' data-response='View on Github' target='_blank'/>`);
}



function unique(value: string, index: number, self: string[]): boolean {
    return self.indexOf(value) === index && value !== "";
}

// Build an array from each tag that's present

const tagList = $(".tutorials-card-container").map(function() {
    return $(this).data("tags").split(",").map((item) => item.trim());
}).get();

// Only return unique tags

const tags = tagList.sort().filter(unique);

// Add filter buttons to the top of the page for each tag

tags.forEach(function(item){
    $(".tutorial-filter-menu").append(" <div class='tutorial-filter filter-btn filter' data-tag='" + item + "'>" + item + "</div>")
});



// Remove hyphens if they are present in the filter buttons

$(".tags").each(function() {
    const tags = $(this).text().split(",");
    tags.forEach((tag, i ) => tags[i] = tags[i].replace(/-/, ' '));
    $(this).html(tags.join(", "));
});



// Remove hyphens if they are present in the card body

$(".tutorial-filter").each(function() {
    const tag = $(this).text();
    $(this).html(tag.replace(/-/, ' '))
})



// Remove any empty p tags that Sphinx adds

$("#tutorial-cards p").each(function(index, item) {
    if (!$(item).text().trim()) $(item).remove();
});



const link = $("a[href='intermediate/speech_command_recognition_with_torchaudio.html']");

if (link.text() === "SyntaxError") {
    console.log("There is an issue with the intermediate/speech_command_recognition_with_torchaudio.html menu item.");
    link.text("Speech Command Recognition with torchaudio");
}



const outerStars = $(".stars-outer > i");

outerStars.on("mouseenter", function() {
    $(this).prevAll().addBack().toggleClass("fas star-fill");
});

outerStars.on("click", function() {
    $(this).prevAll().each(function() {
        $(this).addBack().addClass("fas star-fill");
    });

    $(".stars-outer > i").each(function() {
        $(this).off("mouseenter mouseleave").css({"pointer-events": "none"});
    });
})



$("#pytorch-side-scroll-right li a").on("click", function (e) {
  const href = $(this).attr("href");
  $('html, body').stop().animate({scrollTop: $(href).offset().top - 100}, 850);
  e.preventDefault();
});



const topMenu = $("#pytorch-side-scroll-right");
const topMenuHeight = topMenu.outerHeight() + 1;
// All sidenav items
const menuItems = topMenu.find("a");
// Anchors for menu items
const scrollItems = menuItems.map(function () {
    const item = $(this).attr("href");
    if (item.length) return item;
});
