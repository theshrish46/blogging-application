"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './WriteBlog.css';

// Import React Quill dynamically
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Define custom toolbar options
const toolbarOptions = [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
];

const WriteBlog = () => {
    const [content, setContent] = useState('');

    const handleSave = async () => {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            console.log('Blog post saved successfully!');
        } else {
            console.error('Failed to save the blog post.');
        }
    };

    return (
        <div className='write-blog-container my-12 py-10'>
            <div className='editor-wrapper mb-4'>
                <ReactQuill 
                    value={content} 
                    onChange={setContent} 
                    theme='snow' 
                    modules={{ toolbar: toolbarOptions }} 
                    placeholder="Write your blog here..."
                />
            </div>
            <button
                className='save-button bg-blue-500 text-white px-4 py-2 rounded'
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
};

export default WriteBlog;
