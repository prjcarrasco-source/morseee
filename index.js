const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Diccionario de código morse
const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

// Función para convertir texto a morse
function textToMorse(text) {
  return text
    .toUpperCase()
    .split('')
    .map(char => morseCode[char] || char)
    .join(' ');
}

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'Servicio de conversión a código Morse',
    endpoints: {
      POST: '/morse - Envía un JSON con {"text": "tu texto"}'
    }
  });
});

// Ruta para convertir texto a morse
app.post('/morse', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({
      error: 'Por favor proporciona un campo "text" en el body'
    });
  }
  
  const morse = textToMorse(text);
  
  res.json({
    original: text,
    morse: morse
  });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});