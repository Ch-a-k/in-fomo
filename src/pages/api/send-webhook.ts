import type { NextApiRequest, NextApiResponse } from 'next';

// Определение типа для ответа API
type ResponseData = {
  success: boolean;
  message?: string;
};

// Обработчик API-запроса
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Проверяем, что метод запроса - POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Получаем данные из тела запроса
    const { name, contact, contactType, message, selectedPackage } = req.body;

    // Проверяем обязательные поля
    if (!name || !contact || !contactType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Формируем текст сообщения для Telegram
    const telegramMessage = `
🔔 *Новая заявка на разработку бота*

📦 *Выбранный пакет*: ${selectedPackage || 'Не указан'}

👤 *Имя*: ${name}
📞 *Способ связи*: ${contactType}
📱 *Контакт*: ${contact}
${message ? `💬 *Сообщение*: ${message}` : ''}

⏰ *Дата заявки*: ${new Date().toLocaleString('ru-RU')}
    `.trim();

    // URL вебхука Telegram бота (нужно будет заменить на реальный)
    const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('TELEGRAM_WEBHOOK_URL not configured');
      return res.status(500).json({ success: false, message: 'Webhook URL not configured' });
    }

    // Отправляем запрос к API Telegram
    const telegramResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error('Telegram API error:', errorData);
      return res.status(500).json({ success: false, message: 'Error sending to Telegram' });
    }

    // Возвращаем успешный ответ
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
} 