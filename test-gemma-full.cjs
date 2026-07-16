const fs = require('fs');
const tsCode = fs.readFileSync('./src/config/constants.ts', 'utf8');

const start = tsCode.indexOf('export const DUMMY_PRODUCTS');
const arrayStart = tsCode.indexOf('[', start);
const arrayEnd = tsCode.indexOf('];', arrayStart);
let productsArrayStr = tsCode.slice(arrayStart, arrayEnd + 1);

const products = new Function('return ' + productsArrayStr.replace(/new Date\([^)]*\)\.toISOString\(\)/g, '""'))();

const GEMINI_API_KEY = "AQ.Ab8RN6LYajT8RJ7FfHuyi5KC--Abm-CiNrmnBLF3yZCoEHfv6Q";
const GEMINI_MODEL = "gemma-4-31b-it";
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent?key=' + GEMINI_API_KEY;

const query = "leather bag";

const prompt = `You are a smart product search assistant for an e-commerce store called AURA.

User query: "${query}"

Product catalog:
${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category, tags: p.tags })), null, 2)}

Task: Return a JSON array of product IDs from the catalog that best match the user's query, ranked by relevance (best match first). Only include products that are genuinely relevant. If nothing matches, return an empty array [].

Rules:
- Understand natural language intent (e.g. "warm clothes for cold weather" → coats/outerwear)
- Consider name, description, tags, and category
- Do NOT include unrelated products
- Return ONLY a raw JSON array of IDs with no explanation or markdown. Example: ["prod_3", "prod_1"]`;

async function test() {
	const response = await fetch(GEMINI_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			contents: [{ parts: [{ text: prompt }] }],
			generationConfig: {
				temperature: 0.1,
				maxOutputTokens: 256,
			},
		}),
	});

	const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}
test();
