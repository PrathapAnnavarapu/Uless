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
  featured?: boolean
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
  description?: string
  benefits?: string[]
  parentCompany?: string
  originalPrice?: string
  studentPrice?: string
  premium?: boolean
  productImage?: string
  discount?: string
  link?: string
  promoCode?: string
  referralLink?: string
}

export interface Profile {
  name: string
  email: string
  university: string
  avatar: string | null
  isVerified?: boolean
}
