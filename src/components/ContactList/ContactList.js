import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import operations from "../../redux/contacts/contacts-operations";
import contactsSelectors from "../../redux/contacts/contacts-selectors";
import Button from "@material-ui/core/Button";

const ContactList = ({
  filter,
  contacts,
  isLoading,
  onDelete,
  onClose,
  fetchContacts,
}) => {
  useEffect(() => fetchContacts(), []);

  const onFilterContacts = () => {
    const filterContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterContacts;
  };

  const handlerDelete = (event) => {
    onDelete(event.currentTarget.id);
    onClose();
  };
  {
    /* <p>Loading...</p>  isLoading &&*/
  }
  return (
    <ul>
      {(filter ? onFilterContacts() : contacts).map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <Button
            color="secondary"
            type="button"
            id={id}
            onClick={handlerDelete}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: contactsSelectors.getContacts(state),
    filter: contactsSelectors.getFilter(state),
    isLoading: contactsSelectors.getLoading(state),
  };
};

const mapDispatchProps = (dispatch) => ({
  fetchContacts: () => dispatch(operations.fetchContacts()),
  onDelete: (id) => dispatch(operations.deleteContact(id)),
});

ContactList.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchProps)(ContactList);
