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