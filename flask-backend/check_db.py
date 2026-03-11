from app import create_app, db

app = create_app()
with app.app_context():
    print("connected to", db.engine.url)
    print(db.inspect(db.engine).get_table_names())
