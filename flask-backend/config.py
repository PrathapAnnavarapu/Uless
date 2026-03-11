import os

# Absolute path to the Next.js public/uploads directory so Flask can save there
# and Next.js serves the files at /uploads/<filename>
_here = os.path.dirname(os.path.abspath(__file__))          # flask-backend/
_project_root = os.path.normpath(os.path.join(_here, "..")) # Desktop/Work/Uless

class Config:
    # Example: mysql+pymysql://user:password@localhost/uless_db
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "mysql+pymysql://root:root@localhost:3306/uless_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.environ.get("JWT_SECRET", "replace-with-secret")

    # File upload: save to Next.js public/uploads so the files are served at /uploads/<name>
    UPLOAD_FOLDER = os.environ.get(
        "UPLOAD_FOLDER",
        os.path.join(_project_root, "public", "uploads"),
    )
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB limit
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp", "svg", "avif"}
