export interface Car {
  id: number
  listing_type: string
  type: string
  status: string
  title: string
  long_title: string
  abstract: any
  body: any
  url: string
  price: string
  current_price: string
  price_alt: any
  current_bid: any
  offer_count: number
  has_reserve: boolean
  reserve_met: boolean
  location: string
  city: any
  state: string
  listing_date: string
  start_date: any
  end_date: any
  sold_at: any
  trending: boolean
  is_featured: boolean
  seller: any
  thumbnail: Thumbnail
  brand: any
  dealer: any
  stock_no: any
  year: number
  make: Make
  model: Model
  live_date: string
}

export interface Thumbnail {
  xl: Xl
  md: Md
  xs: Xs
  lg: Lg
}

export interface Xl {
  "16:9": string
  "1:1": string
  "3:2": string
  "4:3": string
  full: string
}

export interface Md {
  "16:9": string
  "1:1": string
  "3:2": string
  "4:3": string
  full: string
}

export interface Xs {
  "16:9": string
  "1:1": string
  "3:2": string
  "4:3": string
  full: string
}

export interface Lg {
  "16:9": string
  "1:1": string
  "3:2": string
  "4:3": string
  full: string
}

export interface Make {
  name: string
  id: number
  slug: string
}

export interface Model {
  name: string
  id: number
  slug: string
}


export interface Gallery {
  title: string
  images: Image[]
}

export interface Image {
  h: number
  w: number
  src: string
  thumb_src: string
}



export interface Comment {
  id: number
  commentable_type: string
  commentable_id: number
  parent_id?: number
  comment: string
  is_approved: boolean
  user_id: number
  is_bid: boolean
  is_offer: boolean
  is_spam: boolean
  created_at: string
  updated_at: string
  ip_address?: string
  commentator?: Commentator
  flags: any[]
  likes: any[]
}

export interface Commentator {
  user_id: number
  email: string
  disabled: number
  country_code?: string
  postal_code: string
  may_email_features: string
  first_name: string
  last_name: string
  phone?: string
  mobile_phone: any
  receive_partner_email: string
  user_name: string
  logrocket_consent: boolean
  registered_via_mobile_app: number
  signed_in_via_mobile_app: number
  id: number
  full_name: string
  is_registered: boolean
  has_payment_method: boolean
  auctions_user_agreement: boolean
  dealer_id: any
  auction_showroom_id: any
  sent_registration_confirmation: boolean
  is_banned: boolean
  brand_data: any
  account_info_provided: boolean
  has_verified_email: boolean
  badges: any[]
  dealer: any
  auction_showroom: any
}


export type Button = { 
  title: string,
  slug: string,
}

export type Filter = { 
  min_year?: string | null;
  max_year?: string | null;
  make_id?: string[];
  min_price?: string | null;
  max_price?: string | null;
}