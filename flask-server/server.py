import os
from flask import Flask, flash, request, redirect, url_for
from Shape_Detection_v1 import parasite
#from werkzeug.utils import secure_filename

#UPLOAD_FOLDER = 'image-analysis'
#ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#def allowed_file(filename):     
#    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def test():
    return {"count":["test","test2"]}

@app.route("/count", methods = ['GET', 'POST'])
def count():
    if request.method == 'GET':
        return {"count":99}
    if request.method == 'POST':
        image_path=request.form.get("name")
        parasites = parasite(image_path)
        return {"count":parasites}


if __name__ == '__main__':
    app.run(port=5000, debug=True)