// api theke json file ante hobe then btn a show show korte hobe
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

// level
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};

// level word display
const displayLevel = (words) => {
  const cardContainer = document.getElementById("cards-container");
  cardContainer.innerHTML = "";

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-lg text-center px-6 py-8 space-y-3">
        <h3 class="text-xl font-bold">${word.word}</h3>
        <p class="text-gray-600 text-sm">meaning/pronunciation</p>
        <p class="text-xl font-medium font-bangla text-gray-500"> ${word.meaning} / ${word.pronunciation}</p>
        <div class="flex justify-between items-center gap-5 mt-2">
          <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });
};
loadLevelWord();

// display show
const displayLesson = (lessons) => {
  // 1 - get element and empty
  const divContainer = document.getElementById("btn-container");
  divContainer.innerHTML = "";

  // 2 - loop chalabo sob gula element er upor
  for (let lesson of lessons) {
    // div create and innerHTML setup
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
        </button>
    `;

    // appendChild kore container a child rakhte hobe
    divContainer.appendChild(div);
  }
};

loadLesson();
