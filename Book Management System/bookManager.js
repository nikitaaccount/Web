
let booknamefield=document.querySelector("#name");
let authorfield=document.querySelector("#author");
let isbnfield=document.querySelector("#isbn");

class Book
{
    constructor(bookname,author,isbn)
    {
        this.bookname=bookname;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI
{
    showMessage(message,type)
    {
        document.querySelector('#message').innerHTML=`<p class="${type}">${message}</p>`;
        setTimeout(function()
        {
            document.querySelector("#message").innerHTML=" ";
        },2000);
    }
    addbook(book)
    {
        let display=document.querySelector("#display");
        let newrow =document.createElement("tr");
        newrow.innerHTML=
            `<td>${book.bookname}</td>
             <td>${book.author}</td>
             <td>${book.isbn}</td>
             <td><a href="#" class="delete-item">X</a></td>`;
        display.appendChild(newrow);
    }
    removeBook(target)
    {
        if(target.className ==="delete-item")
        {
            //also remove from local storage
            let isbn=target.parentElement.previousElementSibling.textContent;
            Storage.removeBookFromMemory(isbn);

            target.parentElement.parentElement.remove();

        }
    }
    clear(bookname,author,isbn)
    {
        bookname.value=" ";
        author.value=" ";
        isbn.value=" ";
    }
}

class Storage
{
    static getCurrentBooks()
    {
        let books= []
        if(localStorage.getItem("mbooks")=== null)
        {
            return books;
        }

        else{
            books=JSON.parse(localStorage.getItem("mbooks"));
            return books;
        }
    }
    static addBookToMemory(book)
    {

        let books= Storage.getCurrentBooks();
        books.push(book);
        localStorage.setItem("mbooks",JSON.stringify(books));
        console.log(books);
    }
    static removeBookFromMemory(isbn)
    {
        // each book is an object whereas books is an array of objects
        let books= Storage.getCurrentBooks();
        books.forEach(function(book,index)
        {
            if(book.isbn === isbn)
            {
                books.splice(index,1);     
            }
        })
        localStorage.setItem("mbooks",JSON.stringify(books));
    }
    static displayBookFromMemory()
    {
        let books= Storage.getCurrentBooks();
        let ui=new UI();
        books.forEach(function(book)
        {
            ui.addbook(book);
        })
    }
}
Storage.displayBookFromMemory();

// ######################## To add a book ##############################
const form =document.querySelector('#form');
form.addEventListener("submit",function(e)
{
    let book= new Book(booknamefield.value,authorfield.value,isbnfield.value);
    let ui=new UI();

    if(booknamefield.value ===''|| authorfield.value ==='' ||  isbnfield.value ==='')
       ui.showMessage(" Fill All Fields ","error");
    else
    {      
        ui.addbook(book);
        Storage.addBookToMemory(book);
        ui.clear(booknamefield,authorfield,isbnfield);
        ui.showMessage(" Book Added Successfully ","success");
    }
    e.preventDefault(); // to prevent form submit
});

// ######################## To remove a book ########################
// using event delegation(we are using parent id display to delete because a tag is not fixed)

document.querySelector("#display").addEventListener("click",function(e)
{
    let ui=new UI();
    ui.removeBook(e.target);
    ui.showMessage(" Book Deleted Successfully ","success");
});

