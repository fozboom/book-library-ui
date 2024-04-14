import React from 'react'
import Publisher from './Publisher';
import { useState, useEffect } from 'react';
import AddPublisher from './AddPublisher';
import EditPublisher from './EditPublisher';

const Publishers = () => {
    const PUBLISHERS_API_BASE_URL = `http://localhost:8080/api/v1/publishers/get`;
    const [publishers, setPublisherList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [publisherId, setPublisherId] = useState(null);
    const fetchPublishers = async () => {
        setLoading(true);
        try {
            const response = await fetch(PUBLISHERS_API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const publishers = await response.json();
            setPublisherList(publishers);
        } catch (error) {
            console.error('Error fetching publishers: ', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPublishers();
    }, []);

    const deletePublisher = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/publishers/delete/` + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete publisher');
            }
            fetchPublishers();
        } catch (error) {
            console.error('Failed to delete publisher:', error);
        }
    };

    const editPublisher = async (e, id) => {
        e.preventDefault();
        setPublisherId(id);
    };


    return (
        <>
            <div className='container mx-auto my-8'>
                <AddPublisher onPublisherAdded={fetchPublishers} />
                <div className='flex shadow border-b'>
                    <table className='min-w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Publisher ID
                                </th>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Publisher Name
                                </th>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Books
                                </th>
                                <th className='text-left font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Address
                                </th>
                                <th className='text-right font-medium text-gray-500 appercase tracking-wide py-3 px-6'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>
                                {publishers?.map((publisher) => (
                                    <Publisher publisher={publisher}
                                        key={publisher.id}
                                        deletePublisher={deletePublisher}
                                        editPublisher={editPublisher} />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <EditPublisher publisherId={publisherId} onPublisherUpdated={fetchPublishers} />
        </>
    );
};

export default Publishers;