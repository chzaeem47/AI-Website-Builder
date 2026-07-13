

const openRouterURL = "https://openrouter.ai/api/v1/chat/completions";

const model =  "deepseek/deepseek-chat-v3.1";

const generateResponse = async (prompt) => {

    const response = await fetch(openRouterURL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPEN_ROUTER_API}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'system',
                    content: 'You must return only valid RAW json'
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature:0.8,

        }),
    });

    if(!response.ok){
        const error = await response.text()
        throw new Error(`OpenRouter Error: ${error}`)    
    }

    const data = await response.json()
    return data.choices[0].message.content
}

export default generateResponse