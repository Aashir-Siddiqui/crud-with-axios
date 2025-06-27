import React, { useState } from 'react';
import { postData } from '../api/PostApi';

export default function Form({ posts, setPosts }) {
  const [addPost, setAddPost] = useState({
    title: '',
    body: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    if (!addPost.title.trim() || !addPost.body.trim()) {
      alert('Please fill in both title and body!');
      return;
    }

    try {
      const res = await postData(addPost);
      console.log('Response:', res);

      if (res.status === 201) {
        setPosts([...posts, res.data]);
        setAddPost({ title: '', body: '' });
      } else {
        alert('Failed to add post. Please try again.');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <form
      onSubmit={handleForm}
      className="flex flex-col sm:flex-row items-baseline-last justify-center gap-4 max-w-md mx-auto p-4"
    >
      <div className="w-full">
        <label htmlFor="title" className="text-sm font-medium text-zinc-700 mb-1 block">
          Title
        </label>
        <input
          type="text"
          id="title"
          autoComplete="off"
          name="title"
          placeholder="Add title"
          value={addPost.title}
          onChange={handleInputChange}
          className="w-full p-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors bg-white text-zinc-800 placeholder-zinc-400"
        />
      </div>
      <div className="w-full">
        <label htmlFor="body" className="text-sm font-medium text-zinc-700 mb-1 block">
          Body
        </label>
        <input
          type="text"
          id="body"
          autoComplete="off"
          name="body"
          placeholder="Add body"
          value={addPost.body}
          onChange={handleInputChange}
          className="w-full p-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-colors bg-white text-zinc-800 placeholder-zinc-400"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-zinc-900 text-white py-3 cursor-pointer rounded-md hover:bg-zinc-950 transition-colors duration-200 font-medium"
      >
        Submit
      </button>
    </form>
  );
}