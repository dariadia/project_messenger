let $container = $(".container");
let $backdrop = $(".backdrop");
let $highlights = $(".highlights");
let $textarea = $("textarea");

let ua = window.navigator.userAgent.toLowerCase();
let isIE = !!ua.match(/msie|trident\/7|edge/);
let isWinPhone = ua.indexOf("windows phone") !== -1;
let isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

function applyHighlights(text) {
  text = text.replace(/\n$/g, "\n\n").replace(
    /(Hi|Hello|Hi there|I'm Tim|My name's Tim).*?\b/g, // TODO (import/export from other module) Нужно получать строку из message.matches, там все готово, нужно только ее сюда импортировать
    "<mark>$&</mark>"
  );

  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, " <wbr>");
  }

  return text;
}

function handleInput() {
  let text = $textarea.val();
  let highlightedText = applyHighlights(text);
  $highlights.html(highlightedText);
}

function handleScroll() {
  let scrollTop = $textarea.scrollTop();
  $backdrop.scrollTop(scrollTop);

  let scrollLeft = $textarea.scrollLeft();
  $backdrop.scrollLeft(scrollLeft);
}

function fixIOS() {
  // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
  $highlights.css({
    "padding-left": "+=3px",
    "padding-right": "+=3px"
  });
}

function bindEvents() {
  $textarea.on({
    input: handleInput,
    scroll: handleScroll
  });
}

if (isIOS) {
  fixIOS();
}

bindEvents();
handleInput();
