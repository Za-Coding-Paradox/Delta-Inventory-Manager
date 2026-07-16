const GEMINI_API_KEY = "AQ.Ab8RN6LYajT8RJ7FfHuyi5KC--Abm-CiNrmnBLF3yZCoEHfv6Q";
const GEMINI_MODEL = "gemma-4-31b-it";
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent?key=' + GEMINI_API_KEY;

const products = [
	{ id: 'prod_1', name: 'Classic White Chino Pants', category: 'Bottoms', tags: ['pants', 'summer'] },
	{ id: 'prod_2', name: 'Teal Cotton Shirt', category: 'Tops', tags: ['shirts', 'summer'] }
];

const query = "summer pants";

const prompt = `You are a smart product search assistant for an e-commerce store called AURA.

User query: "${query}"

Product catalog:
${JSON.stringify(products, null, 2)}

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

	const parts = data.candidates?.[0]?.content?.parts || [];
	const textPart = parts.find(p => !p.thought) || parts[0] || { text: "" };
	const text = textPart.text || "";

	console.log('--- RAW TEXT EXTRACTED ---');
	console.log(text);

	const start = text.indexOf("[");
	const end = text.lastIndexOf("]");
	if (start !== -1 && end > start) {
        console.log('--- PARSED JSON ---');
		console.log(JSON.parse(text.slice(start, end + 1)));
	} else {
        console.log('No JSON array found in text');
    }
}

test();