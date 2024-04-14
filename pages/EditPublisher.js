import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';

const EditPublisher = ({ publisherId, onPublisherUpdated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [publisher, setPublisher] = useState({
        id: '',
        name: '',
        books: []
    });
    useEffect(() => {
        const fetchPublisher = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/publishers/findById?id=` + publisherId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const _publisher = await response.json();
                setPublisher(_publisher);
                setIsOpen(true);
            } catch (error) {
                console.error('Error fetching publisher: ', error);
            }
        };
        if (publisherId) {
            fetchPublisher();
        }

    }, [publisherId]);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setPublisher({
            ...publisher,
            [event.target.name]: value
        });
    };
    const updatePublisher = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/publishers/update?id=${publisher.id}&name=${publisher.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to update publisher');
            }
            const message = await response.text();
            reset(e);
            onPublisherUpdated();
            setPublisher({
                id: '',
                name: '',
                books: []
            });
        } catch (error) {
            console.error('Failed to update publisher:', error);
        }
    };

    const reset = (e) => {
        e.preventDefault();
        setIsOpen(false);
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}>
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
                                Update Publisher
                            </Dialog.Title>
                            <div className="flex max-w-md max-auto">
                                <div className='py-2'>
                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>
                                            Publisher Name
                                        </label>
                                        <input type='text'
                                            name="name"
                                            value={publisher.name}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4 space-x-4 pt-4'>
                                        <button
                                            onClick={updatePublisher}
                                            className='rounded text-white font-semibold bg-green-500 hover:bg-green-700 py-2 px-6'>
                                            Update
                                        </button>
                                        <button
                                            onClick={(e) => reset(e)}
                                            className='rounded text-white font-semibold bg-red-500 hover:bg-red-700 py-2 px-6'>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition >
    )
}

export default EditPublisher