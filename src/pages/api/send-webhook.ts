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
    const { 
      name, 
      contact, 
      contactType, 
      message, 
      selectedPackage, 
      additionalServices = [],
      totalPrice = ''
    } = req.body;

    // Проверяем обязательные поля
    if (!name || !contact || !contactType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Формируем текст сообщения для Telegram
    let telegramMessage = `
🔔 *Новая заявка на разработку бота*

👤 *Имя*: ${name}
📞 *Способ связи*: ${contactType}
📱 *Контакт*: ${contact}
`;

    // Добавляем информацию о выбранном пакете, если есть
    if (selectedPackage) {
      telegramMessage += `\n📦 *Выбранный пакет*: ${selectedPackage}`;
    }

    // Добавляем информацию о дополнительных услугах, если есть
    if (additionalServices && additionalServices.length > 0) {
      telegramMessage += `\n\n🔧 *Дополнительные услуги*:`;
      additionalServices.forEach(service => {
        telegramMessage += `\n- ${service}`;
      });
    }

    // Добавляем общую стоимость, если есть
    if (totalPrice) {
      telegramMessage += `\n\n💰 *Общая стоимость*: ${totalPrice}`;
    }

    // Добавляем сообщение пользователя, если есть
    if (message) {
      telegramMessage += `\n\n💬 *Сообщение*:\n${message}`;
    }

    // Добавляем дату заявки
    telegramMessage += `\n\n⏰ *Дата заявки*: ${new Date().toLocaleString('ru-RU')}`;

    // URL вебхука Telegram бота
    const webhookUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN 
      ? `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`
      : process.env.TELEGRAM_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('Telegram webhook URL not configured');
      return res.status(500).json({ success: false, message: 'Webhook URL not configured' });
    }

    // Получаем ID чата для отправки
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

    if (!chatId) {
      console.error('Telegram chat ID not configured');
      return res.status(500).json({ success: false, message: 'Chat ID not configured' });
    }

    // Отправляем запрос к API Telegram
    const telegramResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
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