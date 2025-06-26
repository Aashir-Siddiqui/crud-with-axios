import React, { useEffect, useState } from 'react';
import { postData } from '../api/PostApi';

export default function Post() {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    const res = await postData();
    console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-zinc-900 min-h-screen">
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
              <button className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors duration-200">
                Delete
              </button>
              <button className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-950 transition-colors duration-200">
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}