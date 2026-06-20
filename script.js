const btnAdd = document.getElementById("btnBook");
let library = document.getElementById("library-container");
const form = document.getElementById("form");
const cancel = document.getElementById("cancel");
const ttitle = document.getElementById("title");
const author = document.getElementById("author");
const page = document.getElementById("page");
const read = document.getElementById("read");
const add = document.getElementById("add");
library.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    if (!card) return;

    const id = card.dataset.id;

    if (e.target.classList.contains("delete")) {
        const index = myLibrary.findIndex(
            (book) => book.id === id
        );
        if(index !== -1){
            myLibrary.splice(index, 1);
        }
        display();
    }

    if (e.target.classList.contains("read-btn")) {
        const book = myLibrary.find(
            (book) => book.id === id
        );

        book.toggleRead();

        display();
    }
});
btnAdd.addEventListener("click", () => {
    form.hidden = !form.hidden;
    console.log(form.hidden);
});
cancel.addEventListener("click", () =>{
    form.hidden = true;
    console.log("test");
})
let myLibrary =[];

function Book(title, author, page, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
}
function addBookToLibrary(book){
    myLibrary.push(book)
};
function display(){
    library.innerHTML=""
    myLibrary.forEach((book)=> {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;
        card.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.page}</p>
            <p class="status">Status: ${book.read ? "read" : "not read"}</p>
            <button class="delete">Delete</button>
            <button class="read-btn">Toggle Read</button>
        `;
        library.appendChild(card);
    });

};

add.addEventListener("click", (event) => {
    event.preventDefault();
    const newBook = new Book (
        title.value,
        author.value,
        page.value,
        read.checked
    );
    addBookToLibrary(newBook)
    display();
    form.reset();
    form.hidden = true;
});
Book.prototype.toggleRead = function () {
    this.read = !this.read
}
