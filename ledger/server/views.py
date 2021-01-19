from flask import Blueprint

main = Blueprint('main', __name__)

@main.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@main.route('/', methods=['GET'])
def home():
    return 'Hi!'

@main.route('/payments', methods=['GET'])
def payments():
    return {'payments': []}
