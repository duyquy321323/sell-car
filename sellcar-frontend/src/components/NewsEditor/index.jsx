import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';
import api from '../../api';

const NewsEditor = () => {
  const [poster, setPoster] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: '',
  });

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      try {
        const res = await api.post(`/news/url-image`, {file: file}, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const imageUrl = res.data;

        editor.chain().focus().setImage({ src: imageUrl }).run();
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    };
  };

  const handleSubmit = async () => {
    try {
      let uploadedPosterUrl = '';
      if (poster) {
        const res = await api.post(`/news/url-image`, {file: poster}, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        uploadedPosterUrl = res.data;
      }

      const htmlContent = editor.getHTML();

      await api.post('/news', {
        title: 'Tiêu đề thử nghiệm',
        content: htmlContent,
        posterUrl: uploadedPosterUrl,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      alert('Đăng tin thành công!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Tạo tin tức</h2>

      <label>Ảnh bìa (Poster):</label>
      <input type="file" accept="image/*" onChange={handlePosterChange} />

      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <button onClick={addImage}>Chèn ảnh</button>
        <EditorContent editor={editor} />
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Đăng tin
      </button>
    </div>
  );
};

export default NewsEditor;
