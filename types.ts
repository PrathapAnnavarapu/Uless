export interface Deal {
  id: string
  title: string
  description: string
  image: string
  category: string
  brand: string
  discount: string
  validUntil: string
  link?: string
  originalPrice?: string
  studentPrice?: string
  brandLogo?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  slug: string
  description?: string
  image?: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  slug: string
  category: string
  tagline?: string
  parentCompany?: string
  description?: string
  benefits?: string[]
  originalPrice?: string
  studentPrice?: string
  discount?: string
  link?: string
  productImage?: string
  promoCode?: string
  referralLink?: string
  featured?: boolean
}

export interface Profile {
  name: string
  email: string
  university: string
  avatar: string | null
  isVerified?: boolean
}
