from flask import Blueprint

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def home():
    return 'Hi!'
