// const express = require('express');
// const cors = require('cors');
// const fetch = require('node-fetch');

// const app = express();
// const PORT = 3000;

// // Enable CORS for all routes
// app.use(cors());
// app.use(express.json());

// // Serve static files
// app.use(express.static('.'));

// // Proxy API endpoint
// app.post('/api/chat', async (req, res) => {
//     try {
//         const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer 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',
//                 'Content-Type': 'application/json',
//                 // Optionally, add Referer and X-Title for ranking
//                 // 'HTTP-Referer': 'https://qusahstore.com/',
//                 // 'X-Title': 'Quessah Store Interactive Stories'
//             },
//             body: JSON.stringify(req.body)
//         });

//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//     console.log(`Open http://localhost:${PORT}/interactive-stories.html`);
// }); 