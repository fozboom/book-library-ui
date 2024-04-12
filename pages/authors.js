import React from 'react'
import Author from './Author';
import { useState, useEffect } from 'react';
import AddAuthor from './AddAuthor';
import EditAuthor from './EditAuthor';

const Authors = () => {
    const AUTHORS_API_BASE_URL = 'http://localhost:8080/api/v1/authors/get';
    const [authors, setAuthorList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorId, setAuthorId] = useState(null);
    const fetchAuthors = async () => {
        setLoading(true);
        try {
            const response = await fetch(AUTHORS_API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const authors = await response.json();
            setAuthorList(authors);
        } catch (error) {
            console.error('Error fetching authors: ', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const deleteAuthor = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/authors/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete author');
            }
            fetchAuthors();
        } catch (error) {
            console.error('Failed to delete author:', error);
        }
    };

    const editAuthor = async (e, id) => {
        e.preventDefault();
        setAuthorId(id);
    };


    return (
        <>
            <div className='container mx-auto my-8'>
                <AddAuthor onAuthorAdded={fetchAuthors} />
                <div className='flex shadow border-b'>
                    <table className='min-w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Author ID
                                </th>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Author Name
                                </th>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Books
                                </th>
                                <th className='text-right font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>
                                {authors?.map((author) => (
                                    <Author author={author}
                                        key={author.id}
                                        deleteAuthor={deleteAuthor}
                                        editAuthor={editAuthor} />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <EditAuthor authorId={authorId} onAuthorUpdated={fetchAuthors} />
        </>
    );
};

export default Authors;