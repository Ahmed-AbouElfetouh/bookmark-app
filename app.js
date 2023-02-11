let siteNameInput = document.getElementById('site-name');
let siteUrlInput = document.getElementById('site-url');
let submitBtn = document.getElementById('submit-btn');
let the_alert = document.getElementById('alert');
let appFooter = document.getElementById('app-footer');

let bookmarksArray = [];

if (localStorage.getItem('all_bookmarks')) {
  bookmarksArray = JSON.parse(localStorage.getItem('all_bookmarks'));
}

getDataFromLocalStorage();

function addBookmarksToArray() {
  if (validUrl()) {
    let bookmark = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookmarksArray.push(bookmark);
    addBookmarksToPage(bookmarksArray);
    saveBookmarksInLocalStorage(bookmarksArray);

    clearInputsValues();
  }
}

function addBookmarksToPage(bookmarks) {
  let allBookmarks = bookmarks.map((bookmark, index) => {
    return `
    <div class="bookmarker-content">
      <div class="website-name">
        <h3>${bookmark.name}</h3>
      </div>
      <div class="website-controls">
        <a href="https://${bookmark.url}" class="visit-btn" target="_blank">Visit</a>
        <a class="delete-btn" onclick="deleteBookmark(${index})">Delete</a>
      </div>
    </div>
    `;
  });
  appFooter.innerHTML = allBookmarks;
}

function saveBookmarksInLocalStorage(bookmarks) {
  localStorage.setItem('all_bookmarks', JSON.stringify(bookmarks));
}

function getDataFromLocalStorage() {
  let data = localStorage.getItem('all_bookmarks');
  if (data) {
    let finalData = JSON.parse(data);
    addBookmarksToPage(finalData);
  }
}

function deleteBookmark(index) {
  bookmarksArray.splice(index, 1);
  addBookmarksToPage(bookmarksArray);
  saveBookmarksInLocalStorage(bookmarksArray);
}

function clearInputsValues() {
  siteNameInput.value = '';
  siteUrlInput.value = '';
}

function validUrl() {
  let urlReg =
    /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  if (urlReg.test(siteUrlInput.value) == true) {
    if (!the_alert.classList.contains('hide')) {
      the_alert.classList.add('hide');
    }
    return true;
  } else {
    the_alert.classList.remove('hide');
    return false;
  }
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (siteNameInput.value !== '' && siteUrlInput.value !== '') {
    addBookmarksToArray();
  }
});
