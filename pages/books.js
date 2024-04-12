import React from 'react'
import Book from './Book';
import { useState, useEffect } from 'react';
import AddBook from './AddBook';
import EditBook from './EditBook';

const Books = () => {
    const BOOKS_API_BASE_URL = 'http://localhost:8080/api/v1/books/get';
    const [books, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookTitle, setBookTitle] = useState(null);
    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch(BOOKS_API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const books = await response.json();
            setBookList(books);
        } catch (error) {
            console.error('Error fetching books: ', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const deleteBook = async (e, title) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/books/delete/' + title, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete book');
            }
            fetchBooks();
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };

    const editBook = async (e, title) => {
        e.preventDefault();
        setBookTitle(title);
    };


    return (
        <>
            <div className='container mx-auto my-8'>
                <AddBook onBookAdded={fetchBooks} />
                <div className='flex shadow border-b'>
                    <table className='min-w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Book Title
                                </th>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Book Price
                                </th>
                                <th className='text-right font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>
                                {books?.map((book) => (
                                    <Book book={book}
                                        key={book.title}
                                        deleteBook={deleteBook}
                                        editBook={editBook} />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <EditBook bookTitle={bookTitle} onBookUpdated={fetchBooks} />
        </>
    );
};

export default Books;