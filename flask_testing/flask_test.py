# No existing code
from flask import Flask, request, jsonify
import cohere
from system_prompts.what_prompt_v4 import what_prompt
from data_cleaning import clean_text


app = Flask(__name__)

cohere_client = cohere.Client('85pa1ijYVknf5xRslpLJ5lB0sBCUXmDyyEPSoQKn')

@app.route('/post_content', methods=['POST'])
def post_content():
    data = request.json
    page_content = data.get('pageContent', '')
    # print('Received content:', page_content)


    co = cohere.ClientV2("85pa1ijYVknf5xRslpLJ5lB0sBCUXmDyyEPSoQKn")
    response = co.chat(
        model="command-r-plus", 
        messages=[{"role": "system", "content": what_prompt},
                {"role": "user", "content": "I want to study computer science."},
                {"role": "user", "content": page_content}]
    )
    true_or_false = clean_text(response.message.content[0].text)
    print(true_or_false)

    return jsonify({'aiResponse': true_or_false})

if __name__ == '__main__':
    app.run(port=5000, debug=True)


    