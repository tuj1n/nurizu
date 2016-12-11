# -*- coding: utf-8 -*-
from nurizu import app
from nurizu.config import CONFIG
from flask import render_template, request
import os
import hashlib


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    def f_hash(text):
        m = hashlib.md5()
        m.update(text)
        return m.hexdigest()

    image = request.files['image']
    extension = image.filename.split('.')[-1]

    if image and extension in CONFIG['allowed_extensions']:
        filename = f_hash(str(image.__hash__())) + '.' + extension
        image.save(os.path.join(os.getcwd() + '/' + CONFIG['upload_folder'], filename))

    return 'hello'


@app.route('/admin')
def admin():
    pass
