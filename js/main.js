// =========Model==========
const model = {
    init: function () {
        // Store our starting books in array
        this.arr = [{
                cover: "https://pictures.abebooks.com/isbn/9788184950519-us.jpg",
                title: "My Experiments with truth",
                author: "Mahatma Gandhi",
                year: 1927
            },
            {
                cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1512912431i/24643924.jpg",
                title: "I was told to come alone",
                author: "Souad Mekhennet",
                year: 2017
            },
            {
                cover: "https://images.gr-assets.com/books/1394343439l/7218334.jpg",
                title: "Java Begginner",
                author: "Balagurusamy",
                year: 1999
            },
            {
                cover: "https://images.gr-assets.com/books/1484220080l/30201327.jpg",
                title: "the lonely hearts hotel",
                author: "Heather",
                year: 2017
            },
            {
                cover: "https://images-na.ssl-images-amazon.com/images/I/61D-QSBXV%2BL.jpg",
                title: "An american marriage",
                author: "silver sperrow",
                year: 2018
            }
        ]
    },

    // return all books informations
    getAllBooks: function () {
        return this.arr;
    },

    // add new books into our collaction(array).
    addNewBook: function (obj) {
        this.arr.push(obj);
    }
}
// ==========Octopus==========
const octopus = {
    // initialize the model and view's by invoking their init method.
    init: function () {
        model.init();
        view.init();
    },

    // ask model to give all books from our collection(model's array).
    getBooks: function () {
        return model.getAllBooks();
    },

    // tell model to add new book in our collection. and then tell render to displlay it
    addNewBooks: function (obj) {
        model.addNewBook(obj);
        view.render();
    }
}

// ==========View==========
const view = {
    // initialize view.
    init: function () {
        //add 'click' evnetListener to add Button that it add new books into model via octopus.
        document.querySelector('.add').addEventListener('click', function (e) {

            // fetch all the values from inputs and give it to octopus so that is gives to model and model will be add it in it's array.
            octopus.addNewBooks({
                cover: document.querySelector('#url').value,
                title: document.querySelector('#title').value,
                author: document.querySelector('#author').value,
                year: document.querySelector('#year').value
            });

            // clear the values of inputs in DOM
            document.querySelector('#url').value = '';
            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#year').value = '';
        });

        // call render to display the oldest + newest books in DOM.
        view.render();

    },

    // View's render
    render: function () {
        // select element to push our books inside that
        const ul = document.querySelector('.books');

        // it will remove all the elements inside the ul tag and recreate all li inside it
        let htmlStr = '';

        // ask octopus to give all books from model 
        octopus.getBooks().forEach(function (book, ind) {
            htmlStr += `<li><h2>Book no ${++ind} </h2><img src=${book.cover}><span>Title = ${book.title}</span> <span> Author = ${book.author}</span><span> Year = ${book.year}</span><input type="button" class="read" value="Read"></button></li>`;
        });

        // and display it inside DOM.
        ul.innerHTML = htmlStr;

        // select all read buttons inside books and add click eventListener on all of them
        const readButtons = Array.from(document.querySelectorAll('.read'));

        readButtons.forEach(element => {
            element.addEventListener('click', (e) => {
                // selct the perrent tag of read button 
                const li = e.target.parentElement;
                
                //and make the border and text of it  to green when it's read button clicked.
                if (li.style.border == "2px solid green") {
                    li.style.border = "1px solid rgb(212, 210, 210)";
                    li.style.color = "black";
                    e.target.value = "Read";
                } else {
                    li.style.border = "2px solid green";
                    li.style.color = "green";
                    e.target.value = "Read✔️";
                }
            });
        });
    }
}

// finally, make it go!
octopus.init();