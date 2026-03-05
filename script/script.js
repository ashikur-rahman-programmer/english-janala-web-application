// api theke json file ante hobe then btn a show show korte hobe
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

//remove btn color
const removeBtnActive = () => {
  const allBtns = document.querySelectorAll(".lessons");
  allBtns.forEach((btn) => btn.classList.remove("active"));
};

// level
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // remove all btn color
      removeBtnActive();

      // btn active korar jonno
      const btnUnqId = document.getElementById(`btn-id-${id}`);
      btnUnqId.classList.add("active");

      // data display show
      displayLevel(data.data);
    });
};

//wordDetails
const wordLoadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  wordDisplayDetails(details.data);
};

const wordDisplayDetails = (word) => {
  console.log(word);
  const detailsContainer = document.getElementById("word-details");
  detailsContainer.innerHTML = `
  <div id="word-details" class="space-y-5">
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>

          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>

          <div class="space-y-3" >
            <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
            <div class="space-x-3">
              <span class="btn">${word.synonyms[0]}</span>
              <span class="btn">${word.synonyms[1]}</span>
              <span class="btn">${word.synonyms[2]}</span>
            </div>
          </div>
          <button class="btn btn-primary active">Complete Learning</button>
        </div>

  `;

  document.getElementById("modal_word").showModal();
};

// level word display
const displayLevel = (words) => {
  const cardContainer = document.getElementById("cards-container");
  cardContainer.innerHTML = "";

  // no lesson
  if (words.length === 0) {
    cardContainer.innerHTML = `
    <div class="col-span-full text-center rounded-2xl mx-auto py-16 space-y-3">
      <img class="mx-auto" src="./assets/alert-error.png" alt="" />

      <p class="font-bangla text-sm text-gray-600">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
      </p>
      <h3 class="font-bangla text-[32px] font-bold">
        নেক্সট Lesson এ যান।
      </h3>
    </div>
    `;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-lg text-center px-6 py-8 space-y-3 hover:-translate-y-2 hover:transition-all duration-300 hover:shadow-md">
        <h3 class="text-xl font-bold">${word.word}</h3>
        <p class="text-gray-600 text-sm">meaning/pronunciation</p>
        <p class="text-lg font-medium font-bangla text-gray-500"> ${word.meaning ? word.meaning : "অর্থ নেই"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ নেই"}</p>
        <div class="flex justify-between items-center gap-5 mt-6">
          <button onclick="wordLoadDetails(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });
};

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
        <button id="btn-id-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lessons">
          <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
        </button>
    `;

    // appendChild kore container a child rakhte hobe
    divContainer.appendChild(div);
  }
};

loadLesson();
