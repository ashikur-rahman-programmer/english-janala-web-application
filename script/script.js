// api theke json file ante hobe then btn a show show korte hobe
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

// display show
const displayLesson = (lessons) => {
  // 1 - get element and empty
  const divContainer = document.getElementById("btn-container");
  divContainer.innerHTML = "";

  // 2 - loop chalabo sob gula element er upor
  for (let lesson of lessons) {
    console.log(lesson);

    // div create and innerHTML setup
    const div = document.createElement("div");
    div.innerHTML = `
        <button class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
        </button>
    `;

    // appendChild kore container a child rakhte hobe
    divContainer.appendChild(div);
  }
};

loadLesson();
