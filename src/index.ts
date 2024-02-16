export interface Env {
	BOT_TOKEN: string;
	TELEGRAM_CHAT_ID: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		async function handleOptions(request: Request) {
			const corsHeaders = {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
				'Access-Control-Max-Age': '86400',
			};

			if (
				request.headers.get('Origin') !== null &&
				request.headers.get('Access-Control-Request-Method') !== null &&
				request.headers.get('Access-Control-Request-Headers') !== null
			) {
				// Handle CORS preflight requests.
				return new Response(null, {
					headers: {
						...corsHeaders,
						'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') as string,
					},
				});
			} else {
				// Handle standard OPTIONS request.
				return new Response(null, {
					headers: {
						Allow: 'GET, HEAD, POST, OPTIONS',
					},
				});
			}
		}

		if (request.method.toUpperCase() === 'OPTIONS') {
			return handleOptions(request);
		}

		if (request.method.toUpperCase() !== 'POST') {
			return new Response(null, { status: 405, statusText: 'Method Not Allowed' });
		}

		const { text } = await request.json<{ text: string }>();
		if (!text) {
			return new Response('Empty text', { status: 400 });
		}

		try {
			let response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage?chat_id=${env.TELEGRAM_CHAT_ID}&text=${text}`);
			response = new Response(response.statusText, response);
			response.headers.set('Access-Control-Allow-Origin', '*');
			return response;
		} catch (error) {
			console.log(error);
			return new Response('Unable to send feedback', { status: 500 });
		}
	},
};
