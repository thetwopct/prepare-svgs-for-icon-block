import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import chalk from 'chalk';

export function processSvgs(options) {
	const { directory: svgDir, framedIcons, forcePathColor, fillColor } = options;
	const output = [];
	const files = fs.readdirSync(svgDir);

	files.forEach(file => {
		if (!file.endsWith('.svg')) return;

		const filePath = path.join(svgDir, file);
		let svg = fs.readFileSync(filePath, 'utf8');

		const { data: optimised } = optimize(svg, {
			path: filePath,
			multipass: true,
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							removeViewBox: false
						}
					}
				},
			],
		});

		let cleaned = optimised;

		// Apply framed icons transformations if enabled
		if (framedIcons) {
			cleaned = cleaned
				.replace(/<svg([^>]*)\sfill="[^"]*"/, '<svg$1')
				.replace(/<rect([^>]*)\sfill="[^"]*"/, '<rect$1')
				.replace(/<path([^>]*?)\sfill="[^"]*"/g, '<path$1');
		}

		// Apply force path color if enabled
		if (forcePathColor) {
			cleaned = cleaned.replace(/<path([^>]*?)>/g, `<path fill="${fillColor}"$1>`);
		}

		const rawName = path.basename(file, '.svg');
		const name = rawName.toLowerCase().replace(/\s+/g, '-');
		const title = rawName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

		output.push({ name, title, icon: cleaned });
	});

	const outPath = path.join(svgDir, 'output.js');
	const outputJs = output
  .map(({ name, title, icon }) => {
    return `\t{\n\t\tname: '${name}',\n\t\ttitle: '${title}',\n\t\ticon: '${icon}'\n\t}`;
  })
  .join(',\n');

	fs.writeFileSync(
		path.join(svgDir, 'output.js'),
		`const customIcons = [\n${outputJs}\n];\n`
	);
	console.log(chalk.green(`✅ Saved to ${outPath}`));
}