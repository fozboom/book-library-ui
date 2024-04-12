import React from 'react'

const Publisher = ({ publisher, deletePublisher, editPublisher }) => {
    return (
        <tr key={publisher.id}>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{publisher.id}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{publisher.name}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>
                    {publisher.books.map((book, index) => (
                        <div key={index}>{book.title}</div>
                    ))}
                </div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{publisher.address}</div>
            </td>
            <td className='text-right px-6 py-4 whitespace-nowrap'>
                <a
                    onClick={(e) => editPublisher(e, publisher.id)}
                    className='text-indigo-600 hover:text-indigo-800 hover: cursor-pointer px-4'>
                    Edit
                </a>
                <a
                    onClick={(e) => deletePublisher(e, publisher.id)}
                    className='text-indigo-600 hover:text-indigo-800 hover: cursor-pointer'>
                    Delete
                </a>
            </td>
        </tr >
    )
}

export default Publisher