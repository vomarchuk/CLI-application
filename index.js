const { Command } = require('commander');
const chalk = require('chalk');
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require('./contacts');
const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case 'list':
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case 'get':
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.blueBright('Contact found!'));
          console.table(contactById);
          return;
        }
        console.log(chalk.redBright('Contact not found!'));
        break;

      case 'add':
        await addContact(name, email, phone);
        console.log(chalk.green('Add new contact'));
        break;

      case 'remove':
        const contact = await removeContact(id);
        if (contact) {
          console.log(chalk.blueBright('Contact remove!'));
          console.table(contact);
          return;
        }

        break;

      default:
        console.warn(chalk.red('Unknown action type'));
    }
  } catch (error) {
    console.log(chalk.red(error));
  }
})(argv);
