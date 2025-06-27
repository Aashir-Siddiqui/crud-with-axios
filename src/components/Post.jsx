import React, { useEffect, useState } from 'react';
import { deletePost, getPost } from '../api/PostApi';
import Form from './Form';

export default function Post() {
    const [posts, setPosts] = useState([]);

    const postData = async () => {
        const res = await getPost();
        console.log(res.data);
        setPosts(res.data);
    };

    useEffect(() => {
        postData();
    }, []);

    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            if (res.status === 200) {
                const newUpdatedPosts = posts.filter((currPost) => {
                    return currPost.id !== id
                })
                setPosts(newUpdatedPosts)
            }
            else {
                console.log("Failed to delete post " + res.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='flex items-center justify-center flex-col p-6 bg-zinc-900 min-h-screen'>
            <section className='bg-zinc-300 rounded-xl shadow-lg p-3 hover:shadow-xl transition-shadow duration-300 border border-zinc-100'>
                <Form posts={posts} setPosts={setPosts} />
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {posts.map((currElem) => {
                    const { id, body, title } = currElem;
                    return (
                        <div
                            key={id}
                            className="bg-zinc-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-zinc-100"
                        >
                            <h2 className="text-xl font-semibold text-zinc-900 mb-2">#{id}</h2>
                            <p className="text-lg font-medium text-zinc-800 capitalize mb-3">{title}</p>
                            <p className="text-zinc-800 text-sm mb-4">{body}</p>
                            <div className="flex gap-3">
                                <button className="bg-zinc-900 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-zinc-950 transition-colors duration-200">
                                    Edit
                                </button>
                                <button className="bg-zinc-700 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-zinc-800 transition-colors duration-200" onClick={() => { handleDeletePost(id) }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </section>
        </section>
    );
}