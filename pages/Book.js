import React from 'react'

const Book = ({ book, deleteBook, editBook }) => {
    return (
        <tr key={book.id}>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>{book.id}</div>
            </td>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>{book.title}</div>
            </td>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>
                    {book.authors.map((author, index) => (
                        <div key={index}>{author.name}</div>
                    ))}
                </div>
            </td>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>{book.publisher?.name}</div>
            </td>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>{book.price}</div>
            </td>
            <td className='text-right px-6 py-4 whitecpase-nowrap'>
                <a
                    onClick={(e) => editBook(e, book.id)}
                    className='text-indigo-600 hover:text-indigo-800 hover: cursor-pointer px-4'>
                    Edit
                </a>
                <a
                    onClick={(e) => deleteBook(e, book.id)}
                    className='text-indigo-600 hover:text-indigo-800 hover: cursor-pointer'>
                    Delete
                </a>
            </td>
        </tr >
    )
}

export default Book