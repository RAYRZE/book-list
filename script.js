const btnAdd = document.getElementById("btnBook");
const libraryContainer = document.getElementById("library-container"); // ganti nama biar gak bentrok
const form = document.getElementById("form");
const cancel = document.getElementById("cancel");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageInput = document.getElementById("page");
const readInput = document.getElementById("read");
const addBtn = document.getElementById("add");

// ========== CLASS BOOK ==========
class Book {
    constructor(title, author, page, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

// ========== CLASS LIBRARY ==========
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.render();
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.render();
    }

    findBook(id) {
        return this.books.find(book => book.id === id);
    }

    toggleBookRead(id) {
        const book = this.findBook(id);
        if (book) {
            book.toggleRead();
            this.render();
        }
    }

    render() {
        libraryContainer.innerHTML = "";
        this.books.forEach(book => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.id = book.id;
            card.innerHTML = `
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.page}</p>
                <p class="status">Status: ${book.read ? "Read" : "Not read"}</p>
                <button class="delete">Delete</button>
                <button class="read-btn">Toggle Read</button>
            `;
            libraryContainer.appendChild(card);
        });
    }
}

// ========== INISIALISASI ==========
const myLibrary = new Library();

// ========== EVENT LISTENER ==========
libraryContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.dataset.id;

    if (e.target.classList.contains("delete")) {
        myLibrary.removeBook(id);
    }

    if (e.target.classList.contains("read-btn")) {
        myLibrary.toggleBookRead(id);
    }
});

// Tombol Add di form
addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pageInput.value,
        readInput.checked
    );
    myLibrary.addBook(newBook);
    form.reset();
    form.hidden = true;
});

// Tombol Show/Hide Form (btnBook & cancel tetap)
btnAdd.addEventListener("click", () => {
    form.hidden = !form.hidden;
});

cancel.addEventListener("click", () => {
    form.hidden = true;
});