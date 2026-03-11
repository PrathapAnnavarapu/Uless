from . import db
from datetime import datetime
import uuid


def gen_uuid():
    # simple UUID generator for string primary keys
    return str(uuid.uuid4())


class Profile(db.Model):
    __tablename__ = "profiles"
    id = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120))
    university = db.Column(db.String(120))
    avatar = db.Column(db.String(255))
    is_verified = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(255))  # store hashed password
    otp_code = db.Column(db.String(6))         # Store the 6 digit verification code
    otp_expiry = db.Column(db.DateTime)        # Expiration time for OTP
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    name = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    icon = db.Column(db.String(50))
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Brand(db.Model):
    __tablename__ = "brands"
    id = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    name = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    logo = db.Column(db.String(255))
    category = db.Column(db.String(120))
    tagline = db.Column(db.String(255))
    parent_company = db.Column(db.String(255))
    description = db.Column(db.Text)
    benefits = db.Column(db.Text)  # stored as JSON string
    original_price = db.Column(db.String(50))
    student_price = db.Column(db.String(50))
    discount = db.Column(db.String(50))
    link = db.Column(db.String(255))
    product_image = db.Column(db.String(255))
    promo_code = db.Column(db.String(120))
    referral_link = db.Column(db.String(255))
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Deal(db.Model):
    __tablename__ = "deals"
    id = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    brand_id = db.Column(db.String(36), db.ForeignKey("brands.id"), nullable=False)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    discount = db.Column(db.String(50))
    original_price = db.Column(db.String(50))
    student_price = db.Column(db.String(50))
    valid_until = db.Column(db.Date)
    link = db.Column(db.String(255))
    image = db.Column(db.String(255))
    category = db.Column(db.String(120))
    brand_logo = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    brand = db.relationship("Brand", backref="deals")
