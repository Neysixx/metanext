import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import { SEO_COMPONENT_FILENAME, SEO_CONFIG_FILENAME, SEO_DATA_FILENAME } from '../constants';
import { generateSEOComponent, getPath, validateConfig } from '../utils';
import { program } from './program';

program
	.command('configure')
	.description('Compile the configuration and generate the SEO files')
	.option('--validate', 'Validate only without generating', false)
	.action(async (options) => {
		console.log(chalk.cyan.bold('\n⚙️  MetaNext - Configuration\n'));

		const spinner = ora('Reading configuration...').start();

		try {
			// Check if the file exists
			if (!(await fs.pathExists(getPath(SEO_CONFIG_FILENAME)))) {
				spinner.fail(SEO_CONFIG_FILENAME + ' file not found');
				console.log(chalk.yellow('\n💡 Run first : ') + chalk.white('bunx metanext init'));
				return;
			}

			spinner.text = 'Compiling configuration...';

			// Compile the TypeScript file
			// Note: In production, use esbuild or tsx for execution
			const configModule = await import(getPath(SEO_CONFIG_FILENAME));
			const config = configModule.default;

			spinner.text = 'Validating configuration...';

			// Basic validation
			const errors = validateConfig(config);
			if (errors.length > 0) {
				spinner.fail('Invalid configuration');
				console.log(chalk.red('\n❌ Errors detected :\n'));
				return;
			}

			if (options.validate) {
				spinner.succeed('Configuration valid !');
				return;
			}

			spinner.text = 'Generating files...';

			// Generate seo-data.json
			await fs.writeFile(getPath(SEO_DATA_FILENAME), JSON.stringify(config, null, 2), 'utf8');

			// Generate the SEO component
			await generateSEOComponent(config);

			spinner.succeed('Configuration compiled successfully !');

			console.log(chalk.green('\n✅ Files generated :'));
			console.log(chalk.gray('   • ' + getPath(SEO_DATA_FILENAME)));
			console.log(chalk.gray('   • ' + getPath(SEO_COMPONENT_FILENAME)));
			console.log(chalk.cyan('\n📝 Use in your pages :'));
			console.log(chalk.white('   import { SEO } from "' + getPath(SEO_COMPONENT_FILENAME) + '"'));
			console.log(chalk.white('   <SEO name="home" />'));
			console.log();
		} catch (error) {
			spinner.fail('Error during configuration');
			console.error(chalk.red((error as Error).message));
			process.exit(1);
		}
	});
