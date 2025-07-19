import { Command } from 'commander';
import { scaffoldApp } from './generators/app';
import { scaffoldService } from './generators/service';
import { scaffoldPackage } from './generators/package';
import { scaffoldEvent } from './generators/event';

const program = new Command();
program.name('scaffold').description('AI Platform scaffolding CLI');

program.command('app')
  .argument('<name>', 'Name of the app')
  .action(scaffoldApp);

program.command('service')
  .argument('<name>', 'Name of the service')
  .action(scaffoldService);

program.command('package')
  .argument('<name>', 'Name of the package')
  .action(scaffoldPackage);

program.command('event')
  .argument('<name>', 'Name of the domain event')
  .action(scaffoldEvent);

program.parse();
