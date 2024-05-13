// src/pages/DiaryForm.tsx
import React, { useState } from 'react';
import { createDiary } from '../api'; // Ensure the API function exists and is correctly imported
import './css/diaryForm.css';

const DiaryForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (!file) {
        const blankImage = new File([new Blob()], 'blank.jpg', { type: 'image/jpeg' });
        formData.append('image', blankImage);
    }
    else {
        formData.append('image', file);
    }

    try {
      const response = await createDiary(formData);
      alert('Diary created successfully!');
    } catch (error) {
      alert('Failed to create diary!');
    }
  };

  return (
    <div className="diary-form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} />
        <label> Only JPG, JPEG, and PNG are supported </label>
        <br />
        <button type="submit">Create Diary</button>
      </form>
    </div>
  );
}

export default DiaryForm;
