'use client';

import { useState } from 'react';

interface IProdDetail {
    name?: string
}

const ContactForm: React.FC<IProdDetail> = ({ name }) => {
  const [form, setForm] = useState({ name: '', email: '', message: name ? `I'm interested in the ${name}, is it still available?` : '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setStatus(data.success ? '✅ Message sent!' : `❌ Error: ${data.error}`);
    if (data.success) setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder={name ? `I'm interested in ${name}, is it still available?` : "Type your message here"}
          value={form.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          Send
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </main>
  );
}

export default ContactForm