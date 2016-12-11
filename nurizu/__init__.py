from flask import Flask
import sys


reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024

import nurizu.views
