const $ = (id) =>
  document.getElementById(id);


/* =========================
   VARIABLES
========================= */

const input = $("photoInput");

const canvas = $("photoCanvas");

const ctx =
  canvas.getContext("2d");

const empty =
  $("emptyPreview");

let image = null;

let selectedFilter = 0;


/* =========================
   FILTERS
========================= */

const filters = [

  ["Original", "none"],

  ["Vivid",
   "saturate(1.5) contrast(1.08)"],

  ["Bright",
   "brightness(1.18) saturate(1.08)"],

  ["Warm",
   "sepia(.18) saturate(1.12)"],

  ["Cool",
   "hue-rotate(12deg) saturate(.92)"],

  ["Golden",
   "sepia(.32) saturate(1.2) contrast(1.05)"],

  ["Vintage",
   "sepia(.28) contrast(.94) brightness(1.04)"],

  ["Retro",
   "sepia(.4) saturate(.8) contrast(.9)"],

  ["B&W",
   "grayscale(1) contrast(1.08)"],

  ["Noir",
   "grayscale(1) contrast(1.45) brightness(.92)"],

  ["Silver",
   "grayscale(.65) contrast(1.15) brightness(1.06)"],

  ["Fade",
   "saturate(.72) contrast(.9) brightness(1.08)"],

  ["Matte",
   "saturate(.72) contrast(.88) brightness(1.08)"],

  ["Dream",
   "saturate(.85) brightness(1.12)"],

  ["Glow",
   "brightness(1.14) saturate(1.06)"],

  ["Drama",
   "contrast(1.35) saturate(1.12)"],

  ["Cinematic",
   "contrast(1.18) saturate(.86) brightness(.96)"],

  ["Deep",
   "contrast(1.3) saturate(1.12) brightness(.94)"],

  ["Pop",
   "contrast(1.25) saturate(1.35)"],

  ["Pastel",
   "saturate(.72) brightness(1.12) contrast(.9)"],

  ["Peach",
   "sepia(.12) hue-rotate(-8deg) saturate(1.18)"],

  ["Rose",
   "sepia(.08) hue-rotate(-18deg) saturate(1.18)"],

  ["Pink",
   "hue-rotate(-12deg) saturate(1.25)"],

  ["Purple",
   "hue-rotate(24deg) saturate(1.2)"],

  ["Blue",
   "hue-rotate(48deg) saturate(1.15)"],

  ["Aqua",
   "hue-rotate(70deg) saturate(1.12)"],

  ["Teal",
   "hue-rotate(105deg) saturate(1.08)"],

  ["Green",
   "hue-rotate(135deg) saturate(1.1)"],

  ["Lime",
   "hue-rotate(155deg) saturate(1.2)"],

  ["Sunset",
   "sepia(.22) hue-rotate(-18deg) saturate(1.32)"],

  ["Autumn",
   "sepia(.3) hue-rotate(-6deg) saturate(1.18)"],

  ["Forest",
   "hue-rotate(112deg) saturate(1.2)"],

  ["Ocean",
   "hue-rotate(55deg) saturate(1.3)"],

  ["Ice",
   "hue-rotate(40deg) saturate(.78) brightness(1.1)"],

  ["Cloud",
   "grayscale(.2) brightness(1.12) contrast(.9)"],

  ["Coffee",
   "sepia(.42) contrast(1.02)"],

  ["Mocha",
   "sepia(.26) saturate(.85) contrast(1.08)"],

  ["Chocolate",
   "sepia(.5) saturate(.72) contrast(1.12)"],

  ["Honey",
   "sepia(.22) saturate(1.35)"],

  ["Amber",
   "sepia(.28) saturate(1.25)"],

  ["Copper",
   "sepia(.34) hue-rotate(-4deg) saturate(1.18)"],

  ["Lavender",
   "hue-rotate(20deg) saturate(.82) brightness(1.06)"],

  ["Misty",
   "saturate(.6) contrast(.82) brightness(1.1)"],

  ["Airy",
   "brightness(1.18) contrast(.88)"],

  ["Clean",
   "contrast(1.06) saturate(1.05)"],

  ["Sharp",
   "contrast(1.25) saturate(1.05)"],

  ["Rich",
   "contrast(1.18) saturate(1.25)"],

  ["Natural",
   "saturate(1.05) contrast(1.02)"],

  ["Portrait",
   "contrast(1.05) saturate(.92) brightness(1.06)"],

  ["Street",
   "contrast(1.2) saturate(.92)"],

  ["Night",
   "brightness(.82) contrast(1.22)"],

  ["Flash",
   "brightness(1.2) contrast(1.18)"],

  ["Film",
   "sepia(.12) contrast(1.08) saturate(.82)"],

  ["Film Soft",
   "sepia(.08) contrast(.95) saturate(.82)"],

  ["Lomo",
   "contrast(1.32) saturate(1.22)"],

  ["Polaroid",
   "sepia(.12) contrast(.94) brightness(1.08)"],

  ["Chrome",
   "grayscale(.28) contrast(1.28)"],

  ["Frost",
   "grayscale(.12) hue-rotate(35deg) brightness(1.1)"],

  ["Dark Mood",
   "brightness(.82) contrast(1.18)"],

  ["Light Mood",
   "brightness(1.13) contrast(.94)"],

  ["Fresh",
   "saturate(1.18) brightness(1.06)"],

  ["Classic",
   "sepia(.12) contrast(1.05) saturate(.92)"]

];


$("filterCount").textContent =
  filters.length + " Filters";


/* =========================
   ADJUSTMENTS
========================= */

let adjustment = {

  brightness: 0,

  contrast: 0,

  saturation: 0,

  warmth: 0,

  blur: 0

};


/* =========================
   CREATE FILTERS
========================= */

function createFilters() {

  const container =
    $("filterContainer");

  container.innerHTML = "";


  filters.forEach(
    (filter, index) => {

      const button =
        document.createElement("button");

      button.className =
        "filter-card";

      if(index === 0) {

        button.classList.add(
          "selected"
        );

      }


      const img =
        document.createElement("img");

      img.className =
        "filter-image";

      img.alt =
        filter[0];


      const name =
        document.createElement("span");

      name.className =
        "filter-name";

      name.textContent =
        filter[0];


      button.appendChild(img);

      button.appendChild(name);

      container.appendChild(button);


      button.onclick = () => {

        if(!image) {

          alert(
            "Pehle Gallery se photo choose karein."
          );

          return;

        }


        selectedFilter =
          index;


        document
          .querySelectorAll(".filter-card")
          .forEach(card =>
            card.classList.remove(
              "selected"
            )
          );


        button.classList.add(
          "selected"
        );


        draw();

      };

    }

  );

}

createFilters();


/* =========================
   CHOOSE PHOTO
========================= */

input.onchange = function(event) {

  const file =
    event.target.files[0];

  if(!file) return;


  const url =
    URL.createObjectURL(file);


  const img =
    new Image();


  img.onload = function() {

    image = img;


    canvas.width =
      img.naturalWidth;

    canvas.height =
      img.naturalHeight;


    empty.style.display =
      "none";


    canvas.style.display =
      "block";


    selectedFilter = 0;


    resetAdjustments();


    createFilterPreviews();


    draw();


    URL.revokeObjectURL(url);

  };


  img.src = url;

};


/* =========================
   FILTER PREVIEW IMAGES
========================= */

function createFilterPreviews() {

  const cards =
    document.querySelectorAll(
      ".filter-card"
    );


  cards.forEach(
    (card, index) => {

      const preview =
        document.createElement(
          "canvas"
        );

      preview.width = 180;

      preview.height = 130;


      const pctx =
        preview.getContext("2d");


      const scale =
        Math.max(
          preview.width /
            image.naturalWidth,

          preview.height /
            image.naturalHeight
        );


      const width =
        image.naturalWidth * scale;

      const height =
        image.naturalHeight * scale;


      pctx.filter =
        filters[index][1];


      pctx.drawImage(

        image,

        (preview.width -
          width) / 2,

        (preview.height -
          height) / 2,

        width,

        height

      );


      const data =
        preview.toDataURL(
          "image/jpeg",
          .8
        );


      card
        .querySelector(
          ".filter-image"
        )
        .src = data;

    }
  );

}


/* =========================
   ADJUST CSS
========================= */

function getAdjustmentFilter() {

  const brightness =
    1 +
    adjustment.brightness /
    100;


  const contrast =
    1 +
    adjustment.contrast /
    100;


  const saturation =
    1 +
    adjustment.saturation /
    100;


  const blur =
    adjustment.blur;


  let warmth = "";


  if(
    adjustment.warmth > 0
  ) {

    warmth =
      `sepia(${adjustment.warmth / 700})`;

  }


  return `
    brightness(${brightness})
    contrast(${contrast})
    saturate(${saturation})
    ${warmth}
    blur(${blur}px)
  `;

}


/* =========================
   DRAW PHOTO
========================= */

function draw() {

  if(!image) return;


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  ctx.save();


  ctx.filter =
    filters[selectedFilter][1]
    + " "
    + getAdjustmentFilter();


  ctx.drawImage(

    image,

    0,
    0,

    canvas.width,
    canvas.height

  );


  ctx.restore();

}


/* =========================
   SLIDERS
========================= */

[
  "brightness",
  "contrast",
  "saturation",
  "warmth",
  "blur"

].forEach(id => {

  const slider =
    $(id);

  const value =
    $(id + "Value");


  slider.oninput = function() {

    adjustment[id] =
      Number(this.value);


    value.textContent =
      this.value;


    draw();

  };

});


/* =========================
   RESET
========================= */

function resetAdjustments() {

  adjustment = {

    brightness: 0,

    contrast: 0,

    saturation: 0,

    warmth: 0,

    blur: 0

  };


  [
    "brightness",
    "contrast",
    "saturation",
    "warmth",
    "blur"

  ].forEach(id => {

    $(id).value = 0;

    $(id + "Value")
      .textContent = "0";

  });

}


$("resetButton").onclick =
  function() {

    if(!image) {

      alert(
        "Pehle Gallery se photo choose karein."
      );

      return;

    }


    selectedFilter = 0;

    resetAdjustments();


    document
      .querySelectorAll(".filter-card")
      .forEach(
        card =>
          card.classList.remove(
            "selected"
          )
      );


    document
      .querySelector(".filter-card")
      ?.classList.add(
        "selected"
      );


    draw();

  };


/* =========================
   DOWNLOAD HD
========================= */

$("downloadButton").onclick =
  function() {

    if(!image) {

      alert(
        "Pehle Gallery se photo choose karein."
      );

      return;

    }


    const link =
      document.createElement("a");


    link.download =
      "GamePix-AI-Edited-Photo.jpg";


    link.href =
      canvas.toDataURL(
        "image/jpeg",
        .95
      );


    link.click();

  };


/* =========================
   DARK MODE
========================= */

$("themeBtn").onclick =
  function() {

    document.body
      .classList.toggle("dark");


    this.textContent =
      document.body.classList.contains(
        "dark"
      )
        ? "☀"
        : "☾";

  };
