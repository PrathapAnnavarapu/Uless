from flask import Blueprint, request, jsonify, current_app
from . import db
from .models import Profile, Brand, Deal
from werkzeug.security import generate_password_hash, check_password_hash
# jwt library comes from PyJWT package
import jwt
import os
from datetime import datetime, timedelta

auth_bp = Blueprint("auth", __name__)
brands_bp = Blueprint("brands", __name__)
deals_bp = Blueprint("deals", __name__)

JWT_SECRET = os.environ.get("JWT_SECRET", "change-me")


# ---------- helpers ----------
def auth_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token = token.split(" ", 1)[1]
        try:
            payload = jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=["HS256"])
            request.user_id = payload.get("id")
        except Exception:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper


def admin_required(f):
    @auth_required
    def wrapper(*args, **kwargs):
        user = Profile.query.get(request.user_id)
        if not user or not user.is_admin:
            return jsonify({"error": "Forbidden"}), 403
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper


# ---------- auth routes ----------

# profile endpoints
@auth_bp.route("/profile", methods=["GET", "PUT"])
@auth_required
def profile():
    user = Profile.query.get(request.user_id)
    if not user:
        return jsonify({"error": "Not found"}), 404

    if request.method == "GET":
        return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "university": user.university,
            "avatar": user.avatar,
            "isVerified": user.is_verified,
            "isAdmin": user.is_admin,
        })

    # PUT -> update
    data = request.json or {}
    if "name" in data:
        user.name = data["name"]
    if "university" in data:
        user.university = data["university"]
    if "avatar" in data:
        user.avatar = data["avatar"]
    db.session.commit()
    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "university": user.university,
            "avatar": user.avatar,
            "isVerified": user.is_verified,
            "isAdmin": user.is_admin,
        },
    })

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json or {}
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    university = data.get("university")
    if not email or not password:
        return jsonify({"error": "email and password required"}), 400
    existing = Profile.query.filter_by(email=email).first()
    if existing:
        return jsonify({"error": "email already exists"}), 400
    hashed = generate_password_hash(password)
    user = Profile(
        email=email,
        name=name or email.split("@")[0],
        avatar=None,
        university=university,
        password_hash=hashed,
    )
    db.session.add(user)
    db.session.commit()
    token = jwt.encode({"id": user.id, "is_admin": user.is_admin, "exp": datetime.utcnow() + timedelta(days=7)}, current_app.config["JWT_SECRET"], algorithm="HS256")
    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "university": user.university,
            "avatar": user.avatar,
            "isVerified": user.is_verified,
            "isAdmin": user.is_admin,
        },
    })


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json or {}
    email = data.get("email")
    password = data.get("password")
    user = Profile.query.filter_by(email=email).first()
    if not user or not user.password_hash or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "invalid credentials"}), 401
    token = jwt.encode({"id": user.id, "is_admin": user.is_admin, "exp": datetime.utcnow() + timedelta(days=7)}, current_app.config["JWT_SECRET"], algorithm="HS256")
    # return full profile info
    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "university": user.university,
            "avatar": user.avatar,
            "isVerified": user.is_verified,
            "isAdmin": user.is_admin,
        },
    })


# ---------- brand routes ----------
@brands_bp.route("/", methods=["GET"])
def list_brands():
    brands = Brand.query.all()
    def serialize(b: Brand):
        return {
            "id": b.id,
            "name": b.name,
            "slug": b.slug,
            "logo": b.logo,
            "category": b.category,
            "tagline": b.tagline,
            "parentCompany": b.parent_company,
            "description": b.description,
            "benefits": json.loads(b.benefits) if b.benefits else [],
            "originalPrice": b.original_price,
            "studentPrice": b.student_price,
            "discount": b.discount,
            "link": b.link,
            "productImage": b.product_image,
            "promoCode": b.promo_code,
            "referralLink": b.referral_link,
            "featured": b.featured,
        }
    return jsonify([serialize(b) for b in brands])


@brands_bp.route("/", methods=["POST"])
@admin_required
def create_brand():
    data = request.json or {}
    # normalize benefits to JSON string
    if "benefits" in data and isinstance(data["benefits"], list):
        data["benefits"] = json.dumps(data["benefits"])
    brand = Brand(**{k: data[k] for k in [
        "name", "slug", "logo", "category", "tagline", "parentCompany",
        "description", "benefits", "originalPrice", "studentPrice", "discount",
        "link", "product_image", "promo_code", "referral_link", "featured"
    ] if k in data})
    db.session.add(brand)
    db.session.commit()
    return jsonify({"id": brand.id, "name": brand.name}), 201


@brands_bp.route("/<brand_id>", methods=["GET"])
def get_brand(brand_id):
    b = Brand.query.get(brand_id)
    if not b:
        return jsonify({"error": "Not found"}), 404
    return jsonify({
        "id": b.id,
        "name": b.name,
        "slug": b.slug,
        "logo": b.logo,
        "category": b.category,
        "tagline": b.tagline,
        "parentCompany": b.parent_company,
        "description": b.description,
        "benefits": json.loads(b.benefits) if b.benefits else [],
        "originalPrice": b.original_price,
        "studentPrice": b.student_price,
        "discount": b.discount,
        "link": b.link,
        "productImage": b.product_image,
        "promoCode": b.promo_code,
        "referralLink": b.referral_link,
        "featured": b.featured,
    })

@brands_bp.route("/<brand_id>", methods=["PUT"])
@admin_required
def update_brand(brand_id):
    b = Brand.query.get(brand_id)
    if not b:
        return jsonify({"error": "Not found"}), 404
    data = request.json or {}
    # convert benefits list back to string
    if "benefits" in data and isinstance(data["benefits"], list):
        data["benefits"] = json.dumps(data["benefits"])
    for key in [
        "name", "slug", "logo", "category", "tagline", "parentCompany",
        "description", "benefits", "originalPrice", "studentPrice", "discount",
        "link", "product_image", "promo_code", "referral_link", "featured"
    ]:
        if key in data:
            setattr(b, key, data[key])
    db.session.commit()
    return jsonify({"success": True, "id": b.id})


# ---------- deals routes ----------
@deals_bp.route("/all", methods=["GET"])
def list_deals():
    # return deal information along with the brand name for convenience
    deals = Deal.query.join(Brand).all()
    result = []
    for d in deals:
        result.append({
            "id": d.id,
            "title": d.title,
            "description": d.description,
            "image": d.link,  # placeholder; adjust if you store images later            
            "brand": d.brand.name if d.brand else None,
            "brand_id": d.brand_id,
            "discount": d.discount,
            "originalPrice": d.original_price,
            "studentPrice": d.student_price,
            "validUntil": d.valid_until.isoformat() if d.valid_until else None,
            "link": d.link,
            "category": d.category,
            "brandLogo": d.brand.logo if d.brand else None,
        })
    return jsonify(result)


@deals_bp.route("/", methods=["POST"])
@admin_required
def create_deal():
    data = request.json or {}
    # allow camelCase fields by normalizing
    key_map = {
        "originalPrice": "original_price",
        "studentPrice": "student_price",
        "validUntil": "valid_until",
        "brandLogo": "brand_logo",
    }
    for old, new in key_map.items():
        if old in data:
            data[new] = data.pop(old)

    # clean up valid_until value: only accept ISO date, otherwise drop
    if "valid_until" in data:
        val = data.get("valid_until")
        if isinstance(val, str):
            try:
                # allow both date and datetime strings
                parsed = datetime.fromisoformat(val)
                data["valid_until"] = parsed.date()
            except Exception:
                data["valid_until"] = None
        else:
            data["valid_until"] = None

    # if brand name provided instead of id, resolve or create
    if "brand" in data and "brand_id" not in data:
        name = data.get("brand")
        brand = Brand.query.filter_by(name=name).first()
        if not brand:
            brand = Brand(name=name, slug=name.lower().replace(" ", "-"))
            db.session.add(brand)
            db.session.flush()
        data["brand_id"] = brand.id
    deal = Deal(**{k: data[k] for k in [
        "brand_id", "title", "description", "discount", "original_price",
        "student_price", "valid_until", "link", "image", "category", "brand_logo"
    ] if k in data})
    db.session.add(deal)
    db.session.commit()
    return jsonify({"id": deal.id, "title": deal.title}), 201


@deals_bp.route("/<deal_id>", methods=["GET"])
def get_deal(deal_id):
    deal = Deal.query.get(deal_id)
    if not deal:
        return jsonify({"error": "Not found"}), 404
    return jsonify({
        "id": deal.id,
        "title": deal.title,
        "description": deal.description,
        "brand_id": deal.brand_id,
        "discount": deal.discount,
        "originalPrice": deal.original_price,
        "studentPrice": deal.student_price,
        "validUntil": deal.valid_until.isoformat() if deal.valid_until else None,
        "link": deal.link,
        "image": deal.image,
        "category": deal.category,
        "brandLogo": deal.brand_logo,
    })


@deals_bp.route("/<deal_id>", methods=["PUT"])
@admin_required
def update_deal(deal_id):
    deal = Deal.query.get(deal_id)
    if not deal:
        return jsonify({"error": "Not found"}), 404
    data = request.json or {}
    # normalize camelCase keys first
    key_map = {
        "originalPrice": "original_price",
        "studentPrice": "student_price",
        "validUntil": "valid_until",
        "brandLogo": "brand_logo",
    }
    for old, new in key_map.items():
        if old in data:
            data[new] = data.pop(old)
    # sanitize valid_until
    if "valid_until" in data:
        val = data.get("valid_until")
        if isinstance(val, str):
            try:
                parsed = datetime.fromisoformat(val)
                data["valid_until"] = parsed.date()
            except Exception:
                data["valid_until"] = None
        else:
            data["valid_until"] = None
    # handle brand change
    if "brand" in data and "brand_id" not in data:
        name = data.get("brand")
        brand = Brand.query.filter_by(name=name).first()
        if not brand:
            brand = Brand(name=name, slug=name.lower().replace(" ", "-"))
            db.session.add(brand)
            db.session.flush()
        data["brand_id"] = brand.id
    for key in [
        "brand_id", "title", "description", "discount", "original_price",
        "student_price", "valid_until", "link", "image", "category", "brand_logo"
    ]:
        if key in data:
            setattr(deal, key, data[key])
    db.session.commit()
    return jsonify({"success": True, "id": deal.id})
