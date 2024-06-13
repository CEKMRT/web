
// 'use client'

// import { useState } from 'react';

// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         alert('Message sent successfully!');
//         // Optionally, clear the form fields
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         alert('Failed to send message. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Failed to send message. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
//       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
//       <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required />
//       <button type="submit">Send Message</button>
//     </form>
//   );
// };

// export default ContactForm;
