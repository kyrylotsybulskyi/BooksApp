/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      bookCart: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    },
    imageOf: {
      bookImage: '.book__image'
    }
  };

  const classNames = {
    bookCart: {
      imageFavorite: 'favorite',
      bookClass: 'book__image',
      checkedClass: 'checked'
    }
  };

  function render() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;

    for (const book of thisBooksList.data) {

      /* make a template for a book */

      const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);

      /* generate HTML from template */

      const generatedHTML = bookTemplate(book);
      console.log('generatedHTML: ', generatedHTML);

      /* create DOM element */

      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
      console.log('thisBooksList.element: ', thisBooksList.element);

      /* find container of books*/

      const bookContainer = document.querySelector(select.containerOf.booksList);

      /* add element to list */

      bookContainer.appendChild(thisBooksList.element);

    }
  }

  /*function getElements() {
    const thisBooksList = this;

    thisBooksList.booksList = document.querySelector(select.containerOf.booksList);

  }*/
  const favoriteBooks = [];
  const filters = [];
  function initActions() {

    const booksImages = document.querySelectorAll(select.imageOf.bookImage);
    console.log('booksImages: ', booksImages);
    const booksList = document.querySelector(select.containerOf.booksList);
    console.log('booksList: ', booksList);
    const event = 'dblclick';
    booksList.addEventListener(event, function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {

        //for (let bookImage of booksImages) {
        //bookImage = document.querySelector(select.imageOf.bookImage);
        // console.log('bookImage: ', bookImage);
        let id = event.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(id)) {
          event.target.offsetParent.classList.add(classNames.bookCart.imageFavorite);
          console.log(id);
          favoriteBooks.push(id);
        } else {
          event.target.offsetParent.classList.remove(classNames.bookCart.imageFavorite);
          const indexOfId = favoriteBooks.indexOf(id);
          favoriteBooks.splice(indexOfId, 1);
        }

        console.log('favoriteBooks: ', favoriteBooks);

      }

    });
    const filter = document.querySelector('.filters');
    console.log(filter);
    filter.addEventListener('click', function (event) {
      event.preventDefault();
      const value = event.target.value;
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' ){
        console.log(value);
        if (event.target.checked == true) {
          event.target.classList.add(classNames.bookCart.checkedClass);
          filters.push(value);
          console.log(filters);
        } else {
          event.target.classList.remove(classNames.bookCart.checkedClass);
          const indexOfFilters = filters.indexOf(value);
          filters.splice(indexOfFilters, 1);
        }
      }
    });
  };





  render();
  //getElements();
  initActions();
}