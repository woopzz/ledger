from flask import Blueprint, request, jsonify
from werkzeug.datastructures import FileStorage

from .payment import get_payments_info_from_csv, save_payments_to_csv

main = Blueprint('main', __name__)

@main.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    header['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@main.route('/', methods=['GET'])
def home():
    return 'Hi!'

@main.route('/save', methods=['POST'])
def payments():
    if request.is_json:
        payments_info = request.json
        data = save_payments_to_csv(payments_info)
        return jsonify({'ok': True, 'result': data})
    else:
        return jsonify({'ok': False, 'msg': 'Invalid request type.'})

@main.route('/parsecsv', methods=['POST'])
def parsecsv():
    if 'fstatement' in request.files:
        fstatement = request.files['fstatement']
        if not isinstance(fstatement, FileStorage):
            return jsonify({'ok': False, 'msg': 'Invalid request format.'})

        payments_info = get_payments_info_from_csv(fstatement.read())

        return jsonify({'ok': True, 'result': payments_info})
    else:
        return jsonify({'ok': False, 'msg': 'Not found a file.'})
