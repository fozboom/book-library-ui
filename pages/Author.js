import React from 'react'

const Author = ({ author, deleteAuthor, editAuthor }) => {
    return (
        <tr key={author.id}>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>{author.id}</div>
            </td>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>{author.name}</div>
            </td>
            <td className='text-left px-6 py-4 whitecpase-nowrap'>
                <div className='text-sm text-gray-500'>
                    {author.books.map((book, index) => (
                        <div key={index}>{book.title}</div>
                    ))}
                </div>
            </td>
            <td className='text-right px-6 py-4 whitecpase-nowrap'>
                <a
                    onClick={(e) => editAuthor(e, author.id)}
                    className='text-indigo-600 hover:text-indigo-800 hover: cursor-pointer px-4'>
                    Edit
                </a>
                <a
                    onClick={(e) => deleteAuthor(e, author.id)}
                    className='text-indigo-600 hover:text-indigo-800 hover: cursor-pointer'>
                    Delete
                </a>
            </td>
        </tr >
    )
}

export default Author