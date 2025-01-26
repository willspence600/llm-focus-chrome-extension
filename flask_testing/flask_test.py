# No existing code
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/post_content', methods=['POST'])
def post_content():
    data = request.json
    page_content = data.get('pageContent', '')
    print('Received content:', page_content)
    return jsonify({'receivedContent': page_content})

if __name__ == '__main__':
    app.run(port=5000, debug=True)