// ============================================
// 📁 lib/queries.ts
// ============================================

// ================= MENU QUERY =================
export const MENU_QUERY = `{
  "countries": *[_type == "country"] | order(name asc){
    _id,
    name,
    "slug": slug.current
  },
  "states": *[_type == "state"] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    "country": country->_id,
    "countrySlug": country->slug.current
  },
  "areas": *[_type == "area"] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    "state": state->_id,
    "stateSlug": state->slug.current
  }
}`;

// ================= SPECIAL TOURS QUERY =================
export const SPECIAL_TOURS_QUERY = `*[_type == "category"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  "count": count(*[_type == "tour" && references(^._id)]),
  "images": images[].asset->url
}`;

// ================= CUSTOMIZED CATEGORY WITH TOURS =================
export const CUSTOMIZED_WITH_TOURS_QUERY = `*[_type == "customizedCategory"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  "icon": icon.asset->url
}`;

// ================= SINGLE CATEGORY PAGE =================
export const SINGLE_CUSTOMIZED_QUERY = `*[_type == "customizedCategory" && slug.current == $slug][0]{
  _id,
  title,
  icon,
  "tours": *[_type == "tour" && references(^._id)]{
    _id,
    title,
    "slug": slug.current,
    state->{ name, "slug": slug.current },
    "images": images[].asset->url
  }
}`;

// ================= HOME BANNER =================
export const homeBannerQuery = `
  *[_type == "homeBanner" && defined(tour) && defined(tour->slug.current)]
  | order(_createdAt desc)[0...3]{
    _id,
    tour->{
      _id,
      title,
      price,
      days,
      "slug": slug.current
    }
  }
`;

// ================= DESTINATION (STATES) SCROLLER =================
// Used in DestinationScroller — clicking a state goes to /tours?state=<stateSlug>
export const destinationQuery = `*[_type == "state"] | order(name asc){
  name,
  "slug": slug.current,
  "image": image.asset->url,
  "country": country->{ name, "slug": slug.current },
  "tours": count(*[_type == "tour" && references(^._id)])
}`;

// ================= HOME SELECTED TOURS =================
export const homeSelectedToursQuery = `*[_type == "homeSection"][0]{
  title,
  tours[]->{
    "slug": slug.current,
    title,
    days,
    price,
    "image": images[0].asset->url
  }
}`;

// ================= FEATURED BANNERS =================
export const featuredBannersQuery = `*[_type == "featuredBanner"] | order(order asc){
  title,
  subtitle,
  price,
  features,
  "image": image.asset->url,
  "slug": tour->slug.current
}`;

// ================= TRAVELLING NOW =================
export const TRAVELLING_NOW_QUERY = `*[_type == "travellingNow"][0]{
  title,
  description,
  cards[]{
    type,
    "destination": select(
      type == "india" => state->name,
      type == "international" => country->name
    ),
    "slug": select(
      type == "india" => state->slug.current,
      type == "international" => country->slug.current
    ),
    "images": images[].asset->url,
    "image": image.asset->url,
    "tourCount": count(*[
      _type == "tour" &&
      (
        (^.type == "india" && references(^.state._ref)) ||
        (^.type == "international" && references(^.country._ref))
      )
    ])
  },
  reviews[]{
    name,
    text,
    location,
    rating
  }
}`;

// ================= FEATURE CARDS QUERY =================
export const FEATURE_CARDS_QUERY = `*[_type == "featureCard"]{
  sections,
  "title": tour->title,
  "price": tour->price,
  "days": tour->days,
  "slug": tour->slug.current,
  "image": tour->images[0].asset->url,
  "state": tour->state->name,
  "country": tour->country->name
}`;

// ================= COUNTRY FAV QUERY =================
// Used in CountryPromo — clicking a country goes to /tours?country=<countrySlug>
export const COUNTRY_FAV_QUERY = `*[_type == "countryFav"]{
  title,
  "countries": countries[]->{
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    "tourCount": count(*[
      _type == "tour" &&
      (
        references(^._id) ||
        state->country._ref == ^._id
      )
    ])
  }
}`;

// ================= POPULAR TOURS QUERY =================
export const POPULAR_TOURS_QUERY = `*[_type == "popularTours"]{
  title,
  tours[]->{
    _id,
    title,
    "slug": slug.current,
    days,
    price,
    state->{ name },
    country->{ name },
    "images": images[].asset->url
  }
}`;

// ================= REVIEWS =================
export const reviewsQuery = `*[_type == "review" && isActive == true] | order(_createdAt desc){
  _id,
  name,
  location,
  rating,
  tourName,
  reviewText,
  date,
  "avatar": avatar.asset->url,
  "bgImage": bgImage.asset->url
}`;

// ================= BLOG LIST =================
export const BLOGS_QUERY = `*[_type == "blog"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  shortDesc,
  "thumbnail": coalesce(thumbnail.asset->url, "")
}`;

// ================= SINGLE BLOG =================
export const SINGLE_BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  content[]{
    ...,
    _type == "image" => { "url": asset->url },
    _type == "tourSection" => {
      title,
      tours[]->{
        _id,
        title,
        price,
        days,
        "slug": slug.current,
        "image": images[0].asset->url
      }
    }
  }
}`;

// ================= ALL TOURS (legacy) =================
export const allToursQuery = `*[_type == "tour"]{
  _id,
  title,
  "slug": slug.current,
  price,
  "duration": coalesce(duration, days),
  rating,
  "image": coalesce(mainImage.asset->url, images[0].asset->url),
  category->{ name },
  state->{ name },
  country->{ name }
}`;

// ================= TOURS LISTING PAGE =================
// Filters by slug (from URL params).
// Pass empty string "" to skip a filter.
export const TOURS_LISTING_QUERY = `*[
  _type == "tour"
  && ($stateSlug   == "" || state->slug.current   == $stateSlug)
  && ($countrySlug == "" || country->slug.current == $countrySlug)
  && ($areaSlug    == "" || references(*[_type=="area" && slug.current==$areaSlug]._id))
] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  price,
  days,
  rating,
  "image":   images[0].asset->url,
  "images":  images[].asset->url,
  "state":       state->name,
  "stateSlug":   state->slug.current,
  "country":     country->name,
  "countrySlug": country->slug.current,
  "area":        area->name,
  "areaSlug":    area->slug.current,
  "categories":           categories[]->{_id, "name": title},
  "customizedCategories": customizedCategories[]->{_id, "name": title}
}`;

// ================= SINGLE TOUR BY SLUG =================
export const tourBySlugQuery = `*[_type == "tour" && slug.current == $slug][0]{
  _id,
  title,
  price,
  days,
  shortDescription,
  rating,

  highlights,

  "images": images[].asset->url,

  "country": country->{
    name,
    "slug": slug.current
  },

  "state": state->{
    name,
    "slug": slug.current
  },

  "area": area->{
    name,
    "slug": slug.current
  },

  "categories": categories[]->{
    title
  },

  "customizedCategories": customizedCategories[]->{
    title
  },

  flights[]{
    _key,
    from,
    to,
    airline,
    flightNo,
    departure,
    arrival
  },

  accommodations[]{
    _key,
    city,
    country,
    hotel,
    checkIn,
    checkOut
  },

  reporting{
    guestType,
    reportingPoint,
    droppingPoint
  },

  itinerary[]{
    _key,
    day,
    title,
    description,
    highlights,
    stay,
    meals
  },

  inclusions,
  exclusions,
  preparation,

  cancellation[]{
    _key,
    days,
    amount,
    percent,
    dateRange
  },

  pdf{
    asset->{
      url
    }
  }
}`;