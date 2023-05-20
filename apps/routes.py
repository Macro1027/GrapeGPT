from flask import render_template, Flask, Blueprint, jsonify, request

from .gpt import chatbot_response, image_create, clear_messages

routes = Blueprint('routes', __name__, template_folder='templates')

@routes.route("/")
def index():
    return render_template('routes/index.html')

@routes.route("/gpt")
def gpt():
    return render_template('routes/gpt.html')

@routes.route("/info")
def info():
    return render_template('routes/info.html')

@routes.route("/contact")
def contact():
    return None

@routes.route('/api/data', methods=['POST'])
def receive_data():
    req_data = request.get_json()
    message = req_data.get('message')
    mode = req_data.get('mode')
    match mode:
        case 'gptturbo':
            output = chatbot_response(message)["choices"][0]["message"]['content']
        case 'dalle':
            output = image_create(message)
        case 'clear':
            output = 'Cleared.'
            clear_messages()
        case _:
            output = 'Error. Model not specified.'
    
    response = {
        'status': 'success',
        'output': output
    }
    return jsonify(response)
