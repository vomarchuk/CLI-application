const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

const readData = async () => {
  const result = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(result);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async contactId => {
  const id = Number(contactId);

  const contacts = await readData();
  const [result] = contacts.filter(contact => contact.id === id);
  return result;
};

const removeContact = async contactId => {
  const id = Number(contactId);
  console.log(id);
  const contacts = await readData();
  const result = contacts.filter(contact => {
    if (contact.id === id) {
      return contact.id !== id;
    }
    return contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newId = contacts.reduce((acc, contact) => {
    if (acc < contact.id) acc = contact.id;
    return acc;
  }, 0);

  const newContact = {
    id: newId + 1,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
