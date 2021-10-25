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
        listContacts();
        break;

      case 'get':
        getContactById(id);
        break;

      case 'add':
        addContact(name, email, phone);
        console.log(chalk.green('Add new contact'));
        break;

      case 'remove':
        removeContact(id);
        break;

      default:
        console.warn(chalk.red('Unknown action type'));
    }
  } catch (error) {
    console.log(chalk.red(error));
  }
})(argv);
