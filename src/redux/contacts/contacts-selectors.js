const getContacts = (state) => state.contacts.items;

const getFilter = (state) => state.contacts.filter;

const getLoading = (state) => state.loading;

export default {
  getContacts,
  getFilter,
  getLoading,
};
