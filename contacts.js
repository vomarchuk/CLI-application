const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const readData = async () => {
  const result = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(result);
};

const listContacts = async () => {
  const contacts = await readData();
  console.table(contacts);
};

const getContactById = async contactId => {
  const contacts = await readData();
  const [result] = contacts.filter(
    ({ id }) => Number(id) === Number(contactId),
  );
  if (result) {
    return console.table(result);
  }
  console.log(chalk.redBright('Contact not found!'));
};

const removeContact = async contactId => {
  const contacts = await readData();
  const searchContactById = contacts.find(
    ({ id }) => Number(id) === Number(contactId),
  );
  if (searchContactById) {
    const removeContact = contacts.filter(
      ({ id }) => Number(id) !== Number(contactId),
    );
    await fs.writeFile(contactsPath, JSON.stringify(removeContact, null, 2));
    console.log(chalk.green('Сontact successfully deleted'));
    return removeContact;
  }
  console.log(chalk.redBright('Contact not found!'));
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();

  const newContact = {
    id: uuidv4(),
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
