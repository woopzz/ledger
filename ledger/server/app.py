import os

from flask import Flask, Blueprint, request, jsonify
from werkzeug.datastructures import FileStorage

from payment import get_payments_info_from_csv, save_payments_to_csv

STATIC_FOLDER = os.environ['STATIC_ROOT']
app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path='/')

@app.route('/', methods=['GET'])
def home():
    return app.send_static_file('index.html')

@app.route('/save', methods=['POST'])
def payments():
    if request.is_json:
        payments_info = request.json
        data = save_payments_to_csv(payments_info)
        return jsonify({'ok': True, 'result': data})
    else:
        return jsonify({'ok': False, 'msg': 'Invalid request type.'})

@app.route('/parsecsv', methods=['POST'])
def parsecsv():
    if 'fstatement' in request.files:
        fstatement = request.files['fstatement']
        if not isinstance(fstatement, FileStorage):
            return jsonify({'ok': False, 'msg': 'Invalid request format.'})

        payments_info = get_payments_info_from_csv(fstatement.read())

        return jsonify({'ok': True, 'result': payments_info})
    else:
        return jsonify({'ok': False, 'msg': 'Not found a file.'})
