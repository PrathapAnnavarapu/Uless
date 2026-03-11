
import json
import os

from app import create_app, db
from app.models import Brand, Deal

# assume mock-data.json sits next to this script; you can export TS file to JSON manually
MOCK_FILE = os.path.join(os.path.dirname(__file__), "mock-data.json")

app = create_app()

with app.app_context():
    db.create_all()

    # create an initial admin user if none exists
    from werkzeug.security import generate_password_hash
    from app.models import Profile

    # seed an admin account (email/password can be changed here)
    if not Profile.query.filter_by(email="admin@example.com").first():
        admin = Profile(
            email="admin@example.com",  # make sure this matches the filter above
            name="Administrator",
            university="",
            avatar=None,
            is_verified=True,
            is_admin=True,
            password_hash=generate_password_hash("admin123"),
        )
        db.session.add(admin)
        db.session.commit()
        print("created default admin user admin@example.com / admin123")
    else:
        # if the record exists but had wrong email previously, let the user know
        existing = Profile.query.filter_by(email="admin@example.com").first()
        if existing and not existing.is_admin:
            print("WARNING: existing user admin@example.com is not an admin")
        

    if not os.path.exists(MOCK_FILE):
        print("mock-data.json not found; please export your JS mock data to JSON")
    else:
        data = json.load(open(MOCK_FILE))
        for b in data.get("mockBrands", []):
            brand = Brand(
                name=b.get("name"),
                slug=b.get("slug"),
                logo=b.get("logo"),
                category=b.get("category"),
                tagline=b.get("tagline"),
                parent_company=b.get("parentCompany"),
                description=b.get("description"),
                benefits=json.dumps(b.get("benefits")) if b.get("benefits") else None,
                original_price=b.get("originalPrice"),
                student_price=b.get("studentPrice"),
                discount=b.get("discount"),
                link=b.get("link"),
                product_image=b.get("productImage"),
                promo_code=b.get("promoCode"),
                referral_link=b.get("referralLink"),
                featured=b.get("featured", False),
            )
            db.session.add(brand)

        from datetime import datetime
        for d in data.get("mockDeals", []):
            # this assumes brand IDs are present or you map by name
            valid = d.get("validUntil")
            if isinstance(valid, str):
                try:
                    valid = datetime.fromisoformat(valid).date()
                except Exception:
                    valid = None
            deal = Deal(
                brand_id=d.get("brandId") or "",
                title=d.get("title"),
                description=d.get("description"),
                discount=d.get("discount"),
                original_price=d.get("originalPrice"),
                student_price=d.get("studentPrice"),
                valid_until=valid,
                link=d.get("link"),
                image=d.get("image"),
                category=d.get("category"),
                brand_logo=d.get("brandLogo"),
            )
            db.session.add(deal)

        db.session.commit()
        print("Seed data imported")

    # debug: list available profiles
    from app.models import Profile
    profiles = Profile.query.all()
    print("profiles in db:")
    for p in profiles:
        print(f" - {p.email} (admin={p.is_admin})")
