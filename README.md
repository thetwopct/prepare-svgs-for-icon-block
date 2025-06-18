# Prepare SVGs for The Icon Block for WordPress

[The Icon Block](https://wordpress.org/plugins/icon-block/) plugin by [Nick Diego](https://nickdiego.com) registers a single, easy-to-use block that allows you to add custom SVG icons and graphics to the WordPress block editor (Gutenberg).

It's a great plugin and an essential on any WordPress site I build (👋🏻 Hello, [I'm James](https://www.thetwopercent.co.uk)) but all the sites I create need custom icon libraries. Adding custom icons in bulk to The Icon Block is a bit tiring, so I made this utility to spit out a folder of icons in a JS file ready for you to import in to your icon registration file.

Install this npm package on your system and you'll get a zero-config CLI to convert raw SVG files into clean, optimized, ready-to-use icons for your WordPress site.

## Features

- 💾 Exports ready-to-use JavaScript for The Icon Block
- ✅ Bulk SVG processing — point it at a folder, done.
- 🧹 Removes bloat — strips out background fills, comments, metadata, etc.
- 📦 SVGO-powered — optimized using preset-default for max compression + clarity.
- 🧠 Smart naming — auto-generates name and title from filenames.
- 🎨 Works with Framed icons (use Advanced options)
- 🧹 Clean path fills — adds your chosen fill to all icons.
- ⚡️ No config required — runs out of the box with good defaults.
- 🖥️ Cross-platform — works on macOS, Linux, and Windows.

## Installation

Install globally via npm:

```sh
npm install --global prepare-svgs-for-icon-block
```

This will make the command available anywhere on your system.

## Usage

After you've installed you can navigate to the folder of SVGs you want to convert, and run:

```sh
$ prepare-svgs
```

The follow the prompts.

The script is non-destructive on the original SVGs, it doesnt touch them or edit them in anyway.

## Output

Whichever folder you run the script in will get an output.js file in it, which will include all your optimised SVGs.

## Adding custom libraries to The Icon Block

The Icons Block is a static block built with React. Therefore, icons need to be added using JavaScript. Nick Diego has written a great article on [how to add custom icons](https://nickdiego.com/adding-custom-icons-to-the-icon-block/). This script will provide your icons for the part that is specifed:

```js
const customIcons = []
```

## Update prepare-svgs-for-icon-block

To update to the latest version you can just run the install command again - `npm install -g prepare-svgs-for-icon-block`

## Feedback and issues

Please open an issue in the [GitHub repo](https://github.com/thetwopct/prepare-svgs-for-icon-block/issues). Thanks.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog

1.0.0
Initial release