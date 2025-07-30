const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [
  {
    id: crypto.randomUUID(),
    title: "Atomic Habits",
    author: "James Clear",
    pages: 320,
    read: true,
  },
  {
    id: crypto.randomUUID(),
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    pages: 352,
    read: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 464,
    read: true,
  }
];

const checkbox = document.getElementById("read")


//Function saves list of books to localstorage
function saveToLocalStorage (myLibrary) {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    displayBooks (myLibrary) //rerender
};


//Book object constructor 
function Book( title, author, pages, read) {
    if (!new.target) {
        throw Error("You can only call with new keyword")
    }
 
    this.id = crypto.randomUUID();
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};


//Add books to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)

    myLibrary.push(newBook)
    saveToLocalStorage(myLibrary)    
}


//Displays the books in the library
function displayBooks (myLibrary) {
    let table = document.querySelector("table")

    table.innerHTML = "" //Clear previous table before rerendering everything again
    
    const headerRow = document.createElement("tr")
    const c1 = document.createElement("td")
    const c2 = document.createElement("td")
    const c3 = document.createElement("td")
    const c4 = document.createElement("td")
    const c5 = document.createElement("td")
    const c6 = document.createElement("td")
    const c7 = document.createElement("td")
    c1.textContent = 'ID'
    c2.textContent = 'Title'
    c3.textContent = 'Author'
    c4.textContent = 'Pages'
    c5.textContent = 'Status'
    c6.textContent = 'Change'
    c7.textContent = 'Delete'
    headerRow.appendChild(c1)
    headerRow.appendChild(c2)
    headerRow.appendChild(c3)
    headerRow.appendChild(c4)
    headerRow.appendChild(c5)
    headerRow.appendChild(c6)
    headerRow.appendChild(c7)
    table.appendChild(headerRow)

    for (const book of myLibrary) {
        const newRow = document.createElement("tr")
        
        for (const key in book) {
            const td = document.createElement("td")
            td.textContent =  book[key]
            newRow.appendChild(td)
        }
        //Add the delete button and 
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const statusButton = document.createElement("button")
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "X"
        statusButton.textContent = "Change"
        
        td1.appendChild(statusButton)
        td2.appendChild(deleteButton)
        newRow.appendChild(td1)
        newRow.appendChild(td2)
        table.appendChild(newRow)

        deleteButton.addEventListener("click", () => removeBook(book.id, myLibrary))
        statusButton.addEventListener("click", () => {
          book.read = !book.read
          saveToLocalStorage(myLibrary)
        });
    }
}

//Function removes a book from list using bookId
function removeBook(bookId, myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
   if (myLibrary[i].id === bookId) {
    myLibrary.splice(i, 1)
    saveToLocalStorage(myLibrary)
   } 
  }
}

//Function changes the read status
function changeStatus (bookId, myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === bookId) {
      myLibrary[i].read = !myLibrary[i].read
      displayBooks(myLibrary)
      break;
    }
  }
}

//Function verifies the submitted form from user
function verifyForm (e) {
  e.preventDefault();
  
  //In our current example, we will only validate the page number.
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const page = document.getElementById("pages").value.trim();
  const read = document.getElementById("read").value.trim();
  
  if (isNaN(page)) return {error: "Not a valid number"}
  if (page % Math.floor(page) !== 0) return {error: "Needs to be a whole number."} 
  return {
    title: title, 
    author: author,
    pages: page,
    read: read,
  };
}

//Run this on program load
document.addEventListener('DOMContentLoaded', () => {
  displayBooks(myLibrary)


  let popWindow = document.getElementById("pop-up-container")
  let addBtn = document.getElementById("addButton")
  let cancelBtn = document.getElementById("closeBtn")
  let saveBtn = document.getElementById("book-form")
  const pageInput = document.getElementById("pages")
  const checkbox = document.getElementById("read")
  

  addBtn.addEventListener("click", () => {
    popWindow.style.display = 'block'
  });

  cancelBtn.addEventListener("click", () => {
    popWindow.style.display = 'none'
  });

  saveBtn.addEventListener("submit", (e) => {
    const response = verifyForm(e)

    if (response.error) {
      console.log(response.error)  
      pageInput.style.border = 'solid red 2px'

    }else {
      pageInput.style.border = 'solid black 2px'
      addBookToLibrary(response.title, response.author, response.pages, checkbox.checked)
    }

  });

  
})

