from apps.routes import routes
from flask import Flask
import os

appvar = Flask(__name__, static_folder='apps/static')
appvar.register_blueprint(routes)

if __name__ == "__main__":
    appvar.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
