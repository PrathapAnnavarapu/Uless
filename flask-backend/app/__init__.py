from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # 1. DISABLE STRICT SLASHES
    # This prevents 301 redirects if you call /api/categories/ instead of /api/categories
    # Redirects are forbidden during CORS preflight requests.
    app.url_map.strict_slashes = False

    # 2. INITIALIZE CORS EARLY
    # Putting this before Blueprints ensures all responses get the correct headers.
    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}},
        supports_credentials=True,
    )

    db.init_app(app)
    migrate.init_app(app, db)

    # 3. REGISTER BLUEPRINTS
    from .routes import auth_bp, brands_bp, deals_bp, categories_bp, upload_bp, saved_deals_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(brands_bp, url_prefix="/api/brands")
    app.register_blueprint(deals_bp, url_prefix="/api/deals")
    app.register_blueprint(categories_bp, url_prefix="/api/categories")
    app.register_blueprint(upload_bp, url_prefix="/api/upload")
    app.register_blueprint(saved_deals_bp, url_prefix="/api/saved-deals")

    with app.app_context():
        from sqlalchemy import text, inspect

        # --- Database Migrations Logic ---
        db.create_all()
        inspector = inspect(db.engine)

        # Profiles Migration
        profile_cols = [c["name"] for c in inspector.get_columns("profiles")]
        
        for col_name, col_def in [
            ("is_admin", "BOOLEAN DEFAULT FALSE"),
            ("otp_code", "VARCHAR(6)"),
            ("otp_expiry", "DATETIME")
        ]:
            if col_name not in profile_cols:
                try:
                    with db.engine.connect() as conn:
                        conn.execute(text(f"ALTER TABLE profiles ADD COLUMN {col_name} {col_def}"))
                        conn.commit()
                    app.logger.info("added profiles.%s column", col_name)
                except Exception as e:
                    app.logger.warning("failed to add profiles.%s: %s", col_name, e)

        # Deals Migration
        deal_cols = [c["name"] for c in inspector.get_columns("deals")]
        for col_name, col_def in [
            ("image", "VARCHAR(255)"),
            ("category", "VARCHAR(120)"),
            ("brand_logo", "VARCHAR(255)"),
        ]:
            if col_name not in deal_cols:
                try:
                    with db.engine.connect() as conn:
                        conn.execute(text(f"ALTER TABLE deals ADD COLUMN {col_name} {col_def}"))
                        conn.commit()
                    app.logger.info("added deals.%s column", col_name)
                except Exception as e:
                    app.logger.warning("failed to add deals.%s: %s", col_name, e)

        # Brands Migration
        brand_cols = [c["name"] for c in inspector.get_columns("brands")]
        for col_name, col_def in [
            ("parent_company", "VARCHAR(255)"),
            ("benefits", "TEXT"),
            ("original_price", "VARCHAR(50)"),
            ("student_price", "VARCHAR(50)"),
            ("discount", "VARCHAR(50)"),
            ("link", "VARCHAR(255)"),
            ("product_image", "VARCHAR(255)"),
            ("promo_code", "VARCHAR(120)"),
            ("referral_link", "VARCHAR(255)"),
        ]:
            if col_name not in brand_cols:
                try:
                    with db.engine.connect() as conn:
                        conn.execute(text(f"ALTER TABLE brands ADD COLUMN {col_name} {col_def}"))
                        conn.commit()
                    app.logger.info("added brands.%s column", col_name)
                except Exception as e:
                    app.logger.warning("failed to add brands.%s: %s", col_name, e)

    return app