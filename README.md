# Feedback-worker

Simple cloudflare worker to take in feedback text and send to a telegram chat. Made for accepting feedback on https://github.com/abizek/pointingpoker

## Setup

1. You need a telegram bot. You can use an existing one or you can create a new one (more on this [here](https://core.telegram.org/bots))
2. Store the bot's token in environment variables under `BOT_TOKEN`
3. Get your telegram chat ID and store it in env variables under `TELEGRAM_CHAT_ID`
4. If you are using a newly created bot since start the chat with the bot, bots cannot send messages to you if you haven't started the chat.
