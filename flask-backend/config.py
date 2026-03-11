import os

class Config:
    # Example: mysql+pymysql://user:password@localhost/uless_db
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "mysql+pymysql://root:root@localhost:3306/uless_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.environ.get("JWT_SECRET", "replace-with-secret")
