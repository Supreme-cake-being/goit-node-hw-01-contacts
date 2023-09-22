import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from './contacts.js';

import { Command } from 'commander';
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      return console.log(contacts);

    case 'get':
      const searchedContact = await getContactById(id);
      return console.log(searchedContact);

    case 'add':
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case 'remove':
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
