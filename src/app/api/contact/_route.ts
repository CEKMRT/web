// pages/api/contact/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter using Zoho Mail settings
    const transporter = nodemailer.createTransport({
      service: 'Zoho',
      auth: {
        user: 'support@cekmrt.xyz',
        pass: 'supportcekmrt' // Replace with your Zoho Mail password
      }
    });

    // Email content
    const mailOptions = {
      from: email,
      to: 'support@cekmrt.xyz',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Error sending email' });
    }
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
