import type { NextApiRequest, NextApiResponse } from 'next';

// Define the response type
type ResponseData = {
  success: boolean;
  message: string;
};

// Define the form data type
interface FormData {
  name: string;
  email?: string;
  phone: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get form data from request body
    const formData: FormData = req.body;
    
    // Validate form data
    if (!formData.name || !formData.phone || !formData.message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Get bot token and chat ID from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Check if Telegram credentials are available
    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error. Please try again later or contact us directly.' 
      });
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 *New Contact Form Submission*

👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
${formData.email ? `📧 *Email:* ${formData.email}\n` : ''}
💬 *Message:*
${formData.message}

📅 *Submitted:* ${new Date().toLocaleString()}
    `;

    // Send message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      }
    );

    // Check if Telegram API responded successfully
    const telegramData = await telegramResponse.json();
    
    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramData);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    }

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
    
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    });
  }
}
