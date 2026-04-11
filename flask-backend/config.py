from sqlalchemy.engine import URL
import os


# Absolute path to the Next.js public/uploads directory so Flask can save there
# and Next.js serves the files at /uploads/<filename>
_here = os.path.dirname(os.path.abspath(__file__))          # flask-backend/
_project_root = os.path.normpath(os.path.join(_here, "..")) # Desktop/Work/Uless

class Config:
    # Example: mysql+pymysql://user:password@localhost/uless_db
    # I've updated this for you:
    db_url = URL.create(
        drivername="mysql+pymysql",
        username="root",
        password="Prathap@178",
        host="localhost",
        port=3306,
        database="uless_db"
    )

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 3600,
    }
    JWT_SECRET = os.environ.get("JWT_SECRET", "replace-with-secret")

    # File upload: save to Next.js public/uploads so the files are served at /uploads/<name>
    UPLOAD_FOLDER = os.environ.get(
        "UPLOAD_FOLDER",
        os.path.join(_project_root, "public", "uploads"),
    )
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB limit
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp", "svg", "avif"}

    # Mail configuration for OTP verification
    MAIL_SERVER = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.environ.get("MAIL_PORT", 587))
    MAIL_USE_TLS = os.environ.get("MAIL_USE_TLS", "True") == "True"
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME", "dummy.uless.app@gmail.com")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD", "dummy_app_password")
