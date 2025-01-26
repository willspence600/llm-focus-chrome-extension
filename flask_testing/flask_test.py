# No existing code
from flask import Flask, request, jsonify
import cohere
app = Flask(__name__)

cohere_client = cohere.Client('85pa1ijYVknf5xRslpLJ5lB0sBCUXmDyyEPSoQKn')

@app.route('/post_content', methods=['POST'])
def post_content():
    data = request.json
    page_content = data.get('pageContent', '')
    print('Received content:', page_content)

    response = cohere_client.generate(
        model='command-r-plus',
        prompt=page_content,
        max_tokens=100
    )

    generated_response = response.generations[0].text.strip()

    return jsonify({'aiResponse': generated_response})

if __name__ == '__main__':
    app.run(port=5000, debug=True)