function resizeSponsorImages() {
  $(".sponsor-img-wrapper").each((idx, el) => {
    $(el).height($(el).width());
  });
}

$(document).ready(resizeSponsorImages);
$(window).resize(resizeSponsorImages);

setInterval(() => $("#blinking-cursor").toggleClass("visually-hidden"), 1_000);
