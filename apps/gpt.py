import openai

openai.api_key = "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"

starting_condition1 = "When it comes to writing content, two factors are crucial, “perplexity” and “burstiness.” Perplexity measures the complexity of text. Separately, burstiness compares the variations of sentences. Humans tend to write with greater burstiness, for example, with some longer or complex sentences alongside shorter ones. AI sentences tend to be more uniform. Therefore, when writing the following content I am going to ask you to create, I need it to have a good amount of perplexity and burstiness. Do you understand?”"
conversation = [{"role": "user", "content": starting_condition1}]

def chatbot_response(prompt):
    conversation.append({"role": "user", "content": prompt})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Model
        messages=conversation,
        n=1,  # Number of responses to generate
        temperature=0.5,  # Controls randomness of response
    )

    if not response:
        return {"choices": [{"message": {"content": "Bot encountered an error"}}]}
    return response

def image_create(prompt):
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    image_url = response['data'][0]['url']
    
    return image_url

def clear_messages():
    global conversation
    conversation = [{"role": "user", "content": starting_condition1}]
    
    
# if __name__ == "__main__":
#     while True:
#         prompt = input('You: ')
#         if prompt.lower() == "clear":
#             conversation = [{"role": "user", "content": starting_condition1}]
#             continue
#         elif prompt.lower() == "quit":
#             break
#         print("AI: ", chatbot_response(prompt))
