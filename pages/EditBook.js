import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';

const EditBook = ({ bookTitle, onBookUpdated }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [book, setBook] = useState({
        title: '',
        price: 0
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/books/findByTitle?title=${bookTitle}`);
                const _book = await response.json();
                setBook(_book);
                setIsOpen(true);
            } catch (error) {
                console.error('Error fetching book: ', error);
            }
        };
        if (bookTitle) {
            fetchBook();
        }
    }, [bookTitle]);

    const handleChange = (event) => {
        setBook(prevBook => ({
            ...prevBook,
            [event.target.name]: event.target.value
        }));
    };

    const updateBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/books/update?price=${book.price}&title=${book.title}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to update book');
            }
            const message = await response.text();
            reset(e);
            onBookUpdated();
            setBook({
                title: '',
                price: 0
            });
        } catch (error) {
            console.error('Failed to update book:', error);
        }
    };

    const reset = (e) => {
        e.preventDefault();
        setIsOpen(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto"
                onClose={reset}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md'>
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Update Book
                            </Dialog.Title>
                            <div className="flex max-w-md max-auto">
                                <div className='py-2'>

                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>
                                            Book Price
                                        </label>
                                        <input type='number'
                                            name="price"
                                            value={book.price}
                                            onChange={handleChange}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4 space-x-4 pt-4'>
                                        <button
                                            onClick={updateBook}
                                            className='rounded text-white font-semibold bg-green-500 hover:bg-green-700 py-2 px-6'>
                                            Update
                                        </button>
                                        <button
                                            onClick={reset}
                                            className='rounded text-white font-semibold bg-red-500 hover:bg-red-700 py-2 px-6'>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>f
                </div>
            </Dialog >
        </Transition >
    )
}

export default EditBook