// ================= MENU QUERY =================
export const MENU_QUERY = `
{
  "countries": *[_type == "country"]{_id, name},

  "states": *[_type == "state"]{
    _id,
    name,
    "country": country->_id
  },

  "areas": *[_type == "area"]{
    _id,
    name,
    "slug": slug.current,
    "state": state->_id
  }
}
`;

// ================= SPECIAL TOURS QUERY =================
export const SPECIAL_TOURS_QUERY = `
*[_type == "category"] | order(title asc){
  _id,
  title,

  "count": count(*[
    _type == "tour" &&
    references(^._id)
  ]),

  "images": images[].asset->url
}
`;


// ================= CUSTOMIZED CATEGORY WITH TOURS =================
export const CUSTOMIZED_WITH_TOURS_QUERY = `
*[_type == "customizedCategory"] | order(title asc){
  _id,
  title,
  "icon": icon.asset->url
}
`;


// ================= SINGLE CATEGORY PAGE =================
export const SINGLE_CUSTOMIZED_QUERY = `
*[_type == "customizedCategory" && slug.current == $slug][0]{
  _id,
  title,
  icon,

  "tours": *[
    _type == "tour" &&
    references(^._id)
  ]{
    _id,
    title,
    "slug": slug.current,

    state->{
      name,
      "slug": slug.current
    },

    "images": images[].asset->url
  }
}
`;


export const homeBannerQuery = `
  *[_type == "homeBanner" && defined(tour)][0..2]{
    tour->{
      title,
      price,
      days,
      "slug": slug.current
    }
  }
`;


export const destinationQuery = `*[_type == "state"]{
  name,
  "slug": slug.current,
  "image": image.asset->url,
  country->{
    name,
    "slug": slug.current
  },
  "tours": count(*[_type == "tour" && references(^._id)])
}`;



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


export const featuredBannersQuery = `
*[_type == "featuredBanner"] | order(order asc) {
  title,
  subtitle,
  price,
  features,
  "image": image.asset->url,
  "slug": tour->slug.current
}
`;


export const TRAVELLING_NOW_QUERY = `
*[_type == "travellingNow"][0]{
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
        (type == "india" && references(^.state._ref)) ||
        (type == "international" && references(^.country._ref))
      )
    ])
  },

  // ✅ LOCAL REVIEWS (from same document)
  reviews[]{
    name,
    text,
    location,
    rating
  }
}
`;