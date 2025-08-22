function resizeSponsorImages() {
  $(".sponsor-img-wrapper").each((idx, el) => {
    $(el).height($(el).width());
  });
}

$(document).ready(resizeSponsorImages);
$(window).resize(resizeSponsorImages);

function addTicketButtonEffects() {
  const $el = $('#ticket-button-wrapper');

  $el
    .on( "mouseenter", () => $el.addClass('drac-bg-animated') )
    .on( "mouseleave", () => $el.removeClass('drac-bg-animated'));
}

$(document).ready(addTicketButtonEffects);

setInterval(() => $("#blinking-cursor").toggleClass("visually-hidden"), 1_000);
