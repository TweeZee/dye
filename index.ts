type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type ColorMarker = (typeof colorTuples)[number][0];

const colorTuples = [
	['reset', 0],
	['black', 30],
	['red', 31],
	['green', 32],
	['yellow', 33],
	['blue', 34],
	['magenta', 35],
	['cyan', 36],
	['white', 37],

	['gray', 90],
	['brightRed', 91],
	['brightGreen', 92],
	['brightYellow', 93],
	['brightBlue', 94],
	['brightMagenta', 95],
	['brightCyan', 96],
	['brightWhite', 97],

	['bgBlack', 40],
	['bgRed', 41],
	['bgGreen', 42],
	['bgYellow', 43],
	['bgBlue', 44],
	['bgMagenta', 45],
	['bgCyan', 46],
	['bgWhite', 47],

	['bgGray', 100],
	['bgBrightRed', 101],
	['bgBrightGreen', 102],
	['bgBrightYellow', 103],
	['bgBrightBlue', 104],
	['bgBrightMagenta', 105],
	['bgBrightCyan', 106],
	['bgBrightWhite', 107],

	['bold', 1],
	['dim', 2],
	['italic', 3],
	['underline', 4],
	['inverse', 7],
	['hidden', 8],
	['strikethrough', 9],
] as const;

const colorMarkers = new Map<ColorMarker, number>(colorTuples);

/**
 * template literal function for coloring parts of console output using coloration markers <br>
 * Usage: dye\`Default \${"red"}<span style="color: red">This is Red </span> \${"green"}
 * <span style="color: green">Green numbers: \${420} </span> \${"reset"} And this is back to normal.
 * \${arbitraryValue} can be included as well.\`
 * @param strings an array of all the substrings that come before, after and between args, in order
 * @param args mixed array of either arbitrary values or {@link ColorMarker}, marking the start of coloration.
 */
export const dye = (
	strings: TemplateStringsArray,
	...args: (ColorMarker | Primitive | Record<PropertyKey, unknown>)[]
): string =>
	args.length
		? strings.reduce(
				(prev, cur, i) =>
					i - 1 < 0
						? prev + cur
						: !!colorMarkers.keys().find((key) => key === args[i - 1])
							? prev + `\x1b[${colorMarkers.get(args[i - 1] as ColorMarker)}m` + cur
							: prev +
								(typeof args[i - 1] === 'object'
									? JSON.stringify(args[i - 1], null, 2)
									: (args[i - 1]?.toString() ?? 'undefined')) +
								cur,
				'',
			) + '\x1b[0m'
		: strings.join('');
