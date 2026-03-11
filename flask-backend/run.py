from app import create_app, db
from flask_migrate import Migrate

app = create_app()
# bind migrate here as well so CLI commands work when FLASK_APP=run.py
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
