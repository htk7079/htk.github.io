// netlify/functions/chatgpt.js
const fetch = require('node-fetch');

// Netlify의 환경 변수에서 OpenAI API 키를 가져옵니다.
const apiKey = process.env.OPENAI_API_KEY;

exports.handler = async function(event, context) {
  try {
    // 클라이언트에서 보낸 메시지
    const { message } = JSON.parse(event.body);

    // OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '서버 오류가 발생했습니다. 다시 시도해주세요.' }),
    };
  }
};
