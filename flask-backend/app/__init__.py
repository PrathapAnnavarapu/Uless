from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

# global database instance
# import.com later to avoid circular imports

db = SQLAlchemy()
# migration helper (initialized in factory)
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    # attach migrations after db is set up
    migrate.init_app(app, db)

    # register blueprints after db is initialized
    from .routes import auth_bp, brands_bp, deals_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(brands_bp, url_prefix="/api/brands")
    app.register_blueprint(deals_bp, url_prefix="/api/deals")

    # if we added new columns to models after initial table creation, attempt a simple migration
    with app.app_context():
        # check whether the new `is_admin` column exists before altering
        from sqlalchemy import text
        try:
            # SQLAlchemy 2.x requires a connection object
            with db.engine.connect() as conn:
                conn.execute(text("SELECT is_admin FROM profiles LIMIT 1"))
        except Exception as check_err:
            # column likely missing, try to add it explicitly
            try:
                with db.engine.connect() as conn:
                    conn.execute(text(
                        "ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE"
                    ))
                app.logger.info("added profiles.is_admin column")
            except Exception as alter_err:
                # log failure so we can diagnose
                app.logger.warning("failed to add profiles.is_admin column: %s", alter_err)

        # also ensure any new deal columns exist to avoid migration pain
        try:
            with db.engine.connect() as conn:
                conn.execute(text("SELECT image, category, brand_logo FROM deals LIMIT 1"))
        except Exception:
            # add columns one by one if they do not exist
            for col_sql in [
                "ALTER TABLE deals ADD COLUMN image VARCHAR(255)",
                "ALTER TABLE deals ADD COLUMN category VARCHAR(120)",
                "ALTER TABLE deals ADD COLUMN brand_logo VARCHAR(255)"
            ]:
                try:
                    with db.engine.connect() as conn:
                        conn.execute(text(col_sql))
                    app.logger.info(f"added deals.{col_sql.split()[-1]} column")
                except Exception as alter_err:
                    app.logger.warning("failed to add deal column: %s", alter_err)

        # ensure brand columns exist as well
        try:
            with db.engine.connect() as conn:
                conn.execute(text("SELECT parent_company, benefits, original_price, student_price, discount, link, product_image FROM brands LIMIT 1"))
        except Exception:
            for col_sql in [
                "ALTER TABLE brands ADD COLUMN parent_company VARCHAR(255)",
                "ALTER TABLE brands ADD COLUMN benefits TEXT",
                "ALTER TABLE brands ADD COLUMN original_price VARCHAR(50)",
                "ALTER TABLE brands ADD COLUMN student_price VARCHAR(50)",
                "ALTER TABLE brands ADD COLUMN discount VARCHAR(50)",
                "ALTER TABLE brands ADD COLUMN link VARCHAR(255)",
                "ALTER TABLE brands ADD COLUMN product_image VARCHAR(255)"
            ]:
                try:
                    with db.engine.connect() as conn:
                        conn.execute(text(col_sql))
                    app.logger.info(f"added brands.{col_sql.split()[-1]} column")
                except Exception as alter_err:
                    app.logger.warning("failed to add brand column: %s", alter_err)
        

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    return app
