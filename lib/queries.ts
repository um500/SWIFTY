export const MENU_QUERY = `
{
  countries: *[_type=="country"]{
    _id,
    name
  },

  states: *[_type=="state"]{
    _id,
    name,
    country->{_id, name}
  },

  tours: *[_type=="tour"]{
    title,
    state->{_id, name}
  }
}
`;