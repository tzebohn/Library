//Book object constructor 
function Book( title, author, pages, read, id = crypto.randomUUID()) {
    if (!new.target) {
        throw Error("You can only call with new keyword")
    }
 
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id 
};


//Add books to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)

    myLibrary.push(newBook)    
}


//Displays the books in the library
function displayBooks (myLibrary) {
    for (const book of myLibrary) {
        console.log(book)
    }
}

const myLibrary = [] //Store list of Book objects

addBookToLibrary("testing", "idk", 200, true)
addBookToLibrary("new", "new", 100, false)


displayBooks(myLibrary)