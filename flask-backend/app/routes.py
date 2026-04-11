from flask import Blueprint, request, jsonify, current_app
from . import db
from .models import Profile, Brand, Deal, Category
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import jwt
import json
import os
import uuid
import random
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from functools import wraps

auth_bp = Blueprint("auth", __name__)
brands_bp = Blueprint("brands", __name__)
deals_bp = Blueprint("deals", __name__)
categories_bp = Blueprint("categories", __name__)
upload_bp = Blueprint("upload", __name__)
saved_deals_bp = Blueprint("saved_deals_bp", __name__)

JWT_SECRET = os.environ.get("JWT_SECRET", "change-me")


# ---------- helpers ----------
def auth_required(f):
    @wraps(f)
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
    return wrapper


def admin_required(f):
    @wraps(f)
    @auth_required
    def wrapper(*args, **kwargs):
        user = Profile.query.get(request.user_id)
        if not user or not user.is_admin:
            return jsonify({"error": "Forbidden"}), 403
        return f(*args, **kwargs)
    return wrapper


# ---------- auth routes ----------

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
    token = jwt.encode(
        {"id": user.id, "is_admin": user.is_admin, "exp": datetime.utcnow() + timedelta(days=7)},
        current_app.config["JWT_SECRET"],
        algorithm="HS256",
    )
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
    token = jwt.encode(
        {"id": user.id, "is_admin": user.is_admin, "exp": datetime.utcnow() + timedelta(days=7)},
        current_app.config["JWT_SECRET"],
        algorithm="HS256",
    )
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


@auth_bp.route("/verify-email/send", methods=["POST"])
@auth_required
def send_verification_email():
    user = Profile.query.get(request.user_id)
    if not user:
        return jsonify({"error": "Not found"}), 404

    otp = str(random.randint(100000, 999999))
    user.otp_code = otp
    user.otp_expiry = datetime.utcnow() + timedelta(minutes=10)
    db.session.commit()

    sender = current_app.config.get("MAIL_USERNAME", "dummy.uless.app@gmail.com")
    password = current_app.config.get("MAIL_PASSWORD", "dummy_app_password")
    host = current_app.config.get("MAIL_SERVER", "smtp.gmail.com")
    port = current_app.config.get("MAIL_PORT", 587)
    use_tls = current_app.config.get("MAIL_USE_TLS", True)

    msg = MIMEText(f"Your Uless student verification code is: {otp}\nIt expires in 10 minutes.")
    msg['Subject'] = 'Uless Student Verification Code'
    msg['From'] = sender
    msg['To'] = user.email

    try:
        # If the password is a placeholder, log instead of connecting to avoid crash
        if password == "dummy_app_password":
            current_app.logger.info(f"DUMMY EMAIL LOG - To: {user.email}, OTP: {otp}")
        else:
            server = smtplib.SMTP(host, port)
            if use_tls:
                server.starttls()
            server.login(sender, password)
            server.send_message(msg)
            server.quit()
    except Exception as e:
        current_app.logger.error(f"Failed to send email: {str(e)}")
        return jsonify({"error": "Failed to send email. Check credentials."}), 500

    return jsonify({"success": True, "message": "Verification code sent to your email"})


@auth_bp.route("/verify-email/confirm", methods=["POST"])
@auth_required
def confirm_verification_email():
    data = request.json or {}
    code = data.get("code")
    if not code:
        return jsonify({"error": "OTP code is required"}), 400

    user = Profile.query.get(request.user_id)
    if not user:
        return jsonify({"error": "Not found"}), 404

    if user.is_verified:
        return jsonify({"success": True, "message": "Already verified"})

    if not user.otp_code or not user.otp_expiry:
        return jsonify({"error": "No OTP requested"}), 400

    if datetime.utcnow() > user.otp_expiry:
        return jsonify({"error": "OTP has expired"}), 400

    if user.otp_code != str(code).strip():
        return jsonify({"error": "Invalid OTP code"}), 400

    user.is_verified = True
    user.otp_code = None
    user.otp_expiry = None
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Email verified successfully",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "university": user.university,
            "avatar": user.avatar,
            "isVerified": user.is_verified,
            "isAdmin": user.is_admin,
        }
    })

# ---------- utility: serialize ----------
def serialize_brand(b: Brand) -> dict:
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
        "premium": b.premium,
    }


def serialize_category(c: Category) -> dict:
    return {
        "id": c.id,
        "name": c.name,
        "slug": c.slug,
        "icon": c.icon,
        "description": c.description,
        "image": c.image,
    }


def apply_brand_data(b: Brand, data: dict):
    """Apply camelCase or snake_case brand data to a Brand model instance."""
    field_map = {
        "name": "name",
        "slug": "slug",
        "logo": "logo",
        "category": "category",
        "tagline": "tagline",
        "parentCompany": "parent_company",
        "description": "description",
        "originalPrice": "original_price",
        "studentPrice": "student_price",
        "discount": "discount",
        "link": "link",
        "productImage": "product_image",
        "promoCode": "promo_code",
        "referralLink": "referral_link",
        "premium": "premium",
        # also accept snake_case directly
        "parent_company": "parent_company",
        "original_price": "original_price",
        "student_price": "student_price",
        "product_image": "product_image",
        "promo_code": "promo_code",
        "referral_link": "referral_link",
    }
    benefits = data.get("benefits")
    if benefits is not None:
        if isinstance(benefits, list):
            b.benefits = json.dumps(benefits)
        else:
            b.benefits = benefits

    for camel, snake in field_map.items():
        if camel in data:
            setattr(b, snake, data[camel])


# ---------- brand routes ----------
@brands_bp.route("/all", methods=["GET"])
def list_brands():
    brands = Brand.query.order_by(Brand.name).all()
    return jsonify([serialize_brand(b) for b in brands])


@brands_bp.route("/", methods=["POST"])
@admin_required
def create_brand():
    data = request.json or {}
    # slug is required
    if not data.get("name") or not data.get("slug"):
        return jsonify({"error": "name and slug are required"}), 400
    existing = Brand.query.filter_by(slug=data["slug"]).first()
    if existing:
        return jsonify({"error": "slug already exists"}), 400
    brand = Brand(name=data["name"], slug=data["slug"])
    apply_brand_data(brand, data)
    db.session.add(brand)
    db.session.commit()
    return jsonify(serialize_brand(brand)), 201


@brands_bp.route("/<brand_id>", methods=["GET"])
def get_brand(brand_id):
    b = Brand.query.get(brand_id)
    if not b:
        return jsonify({"error": "Not found"}), 404
    return jsonify(serialize_brand(b))


@brands_bp.route("/<brand_id>", methods=["PUT"])
@admin_required
def update_brand(brand_id):
    b = Brand.query.get(brand_id)
    if not b:
        return jsonify({"error": "Not found"}), 404
    data = request.json or {}
    apply_brand_data(b, data)
    db.session.commit()
    return jsonify(serialize_brand(b))


@brands_bp.route("/<brand_id>", methods=["DELETE"])
@admin_required
def delete_brand(brand_id):
    b = Brand.query.get(brand_id)
    if not b:
        return jsonify({"error": "Not found"}), 404
    # remove related deals first to avoid FK constraint errors
    for deal in b.deals:
        db.session.delete(deal)
    db.session.delete(b)
    db.session.commit()
    return jsonify({"success": True})


# ---------- category routes ----------
@categories_bp.route("/all", methods=["GET"])
def list_categories():
    cats = Category.query.order_by(Category.name).all()
    return jsonify([serialize_category(c) for c in cats])


@categories_bp.route("/", methods=["POST"])
@admin_required
def create_category():
    data = request.json or {}
    if not data.get("name") or not data.get("slug"):
        return jsonify({"error": "name and slug are required"}), 400
    existing = Category.query.filter_by(slug=data["slug"]).first()
    if existing:
        return jsonify({"error": "slug already exists"}), 400
    cat = Category(
        name=data["name"],
        slug=data["slug"],
        icon=data.get("icon"),
        description=data.get("description"),
        image=data.get("image"),
    )
    db.session.add(cat)
    db.session.commit()
    return jsonify(serialize_category(cat)), 201


@categories_bp.route("/<cat_id>", methods=["GET"])
def get_category(cat_id):
    c = Category.query.get(cat_id)
    if not c:
        return jsonify({"error": "Not found"}), 404
    return jsonify(serialize_category(c))


@categories_bp.route("/<cat_id>", methods=["PUT"])
@admin_required
def update_category(cat_id):
    c = Category.query.get(cat_id)
    if not c:
        return jsonify({"error": "Not found"}), 404
    data = request.json or {}
    for field in ["name", "slug", "icon", "description", "image"]:
        if field in data:
            setattr(c, field, data[field])
    db.session.commit()
    return jsonify(serialize_category(c))


@categories_bp.route("/<cat_id>", methods=["DELETE"])
@admin_required
def delete_category(cat_id):
    c = Category.query.get(cat_id)
    if not c:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(c)
    db.session.commit()
    return jsonify({"success": True})


# ---------- deals routes ----------
def serialize_deal(d: Deal) -> dict:
    return {
        "id": d.id,
        "title": d.title,
        "description": d.description,
        "image": d.image,
        "brand": d.brand.name if d.brand else None,
        "brand_id": d.brand_id,
        "discount": d.discount,
        "originalPrice": d.original_price,
        "studentPrice": d.student_price,
        "validUntil": d.valid_until.isoformat() if d.valid_until else None,
        "link": d.link,
        "category": d.category,
        "featured": d.featured,
        "brandLogo": d.brand_logo if d.brand_logo else (d.brand.logo if d.brand else None),
    }


def apply_deal_data(deal: Deal, data: dict):
    key_map = {
        "originalPrice": "original_price",
        "studentPrice": "student_price",
        "validUntil": "valid_until",
        "brandLogo": "brand_logo",
        "brand_id": "brand_id",
    }
    normalized = dict(data)
    for camel, snake in key_map.items():
        if camel in normalized:
            normalized[snake] = normalized.pop(camel)

    # sanitize valid_until
    if "valid_until" in normalized:
        val = normalized["valid_until"]
        if isinstance(val, str) and val:
            try:
                normalized["valid_until"] = datetime.fromisoformat(val).date()
            except Exception:
                normalized["valid_until"] = None
        else:
            normalized["valid_until"] = None

    # resolve brand name → brand_id
    if "brand" in normalized and "brand_id" not in normalized:
        name = normalized.get("brand")
        brand = Brand.query.filter_by(name=name).first()
        if not brand:
            brand = Brand(name=name, slug=name.lower().replace(" ", "-"))
            db.session.add(brand)
            db.session.flush()
        normalized["brand_id"] = brand.id

    for key in ["brand_id", "title", "description", "discount", "original_price",
                "student_price", "valid_until", "link", "image", "category", "featured", "brand_logo"]:
        if key in normalized:
            setattr(deal, key, normalized[key])


@deals_bp.route("/all", methods=["GET"])
def list_deals():
    deals = Deal.query.join(Brand).all()
    return jsonify([serialize_deal(d) for d in deals])


@deals_bp.route("/", methods=["POST"])
@admin_required
def create_deal():
    data = request.json or {}
    # need at least a brand
    deal = Deal(brand_id="__placeholder__")
    apply_deal_data(deal, data)
    if not deal.brand_id or deal.brand_id == "__placeholder__":
        return jsonify({"error": "brand or brand_id is required"}), 400
    db.session.add(deal)
    db.session.commit()
    return jsonify(serialize_deal(deal)), 201


@deals_bp.route("/<deal_id>", methods=["GET"])
def get_deal(deal_id):
    deal = Deal.query.get(deal_id)
    if not deal:
        return jsonify({"error": "Not found"}), 404
    return jsonify(serialize_deal(deal))


@deals_bp.route("/<deal_id>", methods=["PUT"])
@admin_required
def update_deal(deal_id):
    deal = Deal.query.get(deal_id)
    if not deal:
        return jsonify({"error": "Not found"}), 404
    data = request.json or {}
    apply_deal_data(deal, data)
    db.session.commit()
    return jsonify(serialize_deal(deal))


@deals_bp.route("/<deal_id>", methods=["DELETE"])
@admin_required
def delete_deal(deal_id):
    deal = Deal.query.get(deal_id)
    if not deal:
        return jsonify({"error": "Not found"}), 404
    db.session.delete(deal)
    db.session.commit()
    return jsonify({"success": True})




# ---------- saved delas route ----------
@saved_deals_bp.route("/all", methods=["GET"])
def get_saved_deals():
    deals = SavedDeals.query.order_by(SavedDeals.created_at.desc()).all()

    return jsonify([
        {
            "id": d.id,
            "title": d.title,
            "description": d.description,
            "discount": d.discount,
            "original_price": d.original_price,
            "student_price": d.student_price,
            "valid_until": d.valid_until.isoformat() if d.valid_until else None,
            "link": d.link,
            "image": d.image,
            "category": d.category,
            "brand_logo": d.brand_logo,
            "featured": d.featured,
        }
        for d in deals
    ])

# ✅ Save a deal
@saved_deals_bp.route("/", methods=["POST"])
def save_deal():
    data = request.json

    # prevent duplicates
    existing = SavedDeals.query.filter_by(id=data.get("id")).first()
    if existing:
        return jsonify({"message": "Deal already saved"}), 200

    deal = SavedDeals(
        id=data.get("id"),
        brand_id=data.get("brand_id"),
        title=data.get("title"),
        description=data.get("description"),
        discount=data.get("discount"),
        original_price=data.get("original_price"),
        student_price=data.get("student_price"),
        valid_until=datetime.fromisoformat(data["valid_until"]) if data.get("valid_until") else None,
        link=data.get("link"),
        image=data.get("image"),
        category=data.get("category"),
        brand_logo=data.get("brand_logo"),
        featured=data.get("featured", False),
    )

    db.session.add(deal)
    db.session.commit()

    return jsonify({"message": "Deal saved successfully"}), 201


# ✅ Delete a saved deal
@saved_deals_bp.route("/<string:id>", methods=["DELETE"])
def delete_saved_deal(id):
    deal = SavedDeals.query.get(id)

    if not deal:
        return jsonify({"message": "Deal not found"}), 404

    db.session.delete(deal)
    db.session.commit()

    return jsonify({"message": "Deal removed"})



# ---------- upload route ----------
def _allowed_file(filename: str) -> bool:
    allowed = current_app.config.get("ALLOWED_EXTENSIONS", {"png", "jpg", "jpeg", "gif", "webp", "svg", "avif"})
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed


@upload_bp.route("/", methods=["POST"])
@admin_required
def upload_file():
    """
    POST /api/upload
    Body: multipart/form-data  { file: <binary> }
    Returns: { url: "/uploads/<uuid>.<ext>" }

    The file is saved into <project_root>/public/uploads/ so Next.js serves it
    at http://localhost:3000/uploads/<filename>.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file field in request"}), 400

    file = request.files["file"]
    if not file or file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not _allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Use PNG, JPG, GIF, WEBP, SVG or AVIF."}), 400

    # Build a safe, unique filename: <uuid>.<original_ext>
    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{uuid.uuid4().hex}.{ext}"

    upload_folder = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_folder, exist_ok=True)

    save_path = os.path.join(upload_folder, unique_name)
    file.save(save_path)

    # Return the URL path that Next.js will serve
    url = f"/uploads/{unique_name}"
    return jsonify({"url": url, "filename": unique_name}), 201