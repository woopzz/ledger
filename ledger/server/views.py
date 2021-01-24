from flask import Blueprint, request, jsonify
from werkzeug.datastructures import FileStorage

from .payment import get_payments_from_csv

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

@main.route('/parsecsv', methods=['POST'])
def parsecsv():
    if 'fstatement' in request.files:
        fstatement = request.files['fstatement']
        if not isinstance(fstatement, FileStorage):
            return jsonify({'ok': False, 'msg': 'Invalid request format.'})

        payment_list = get_payments_from_csv(fstatement.read())

        return jsonify({'ok': True, 'result': payment_list})
    else:
        return jsonify({'ok': False, 'msg': 'Not found a file.'})
