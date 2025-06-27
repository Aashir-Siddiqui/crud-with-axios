import React, { useEffect, useState } from 'react';
import { postData, updateData } from '../api/PostApi';

export default function Form({ posts, setPosts, updatePost, setUpdatePost }) {
  const [addPost, setAddPost] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    updatePost && setAddPost({
      title: updatePost.title || "",
      body: updatePost.body || ""
    })
  }, [updatePost])

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

  const isEmpty = Object.keys(updatePost).length === 0

  const updatePostData = async () => {
    try {
      const res = await updateData(updatePost.id, addPost)
      console.log(res)
      if (res.status === 200) {
        setPosts((prev) => {
          return prev.map((currElem) => {
            return currElem.id === res.data.id ? res.data : currElem
          })
        })
        setAddPost({ title: '', body: '' });
        setUpdatePost({})
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleForm = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData()
    }
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
        value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
}