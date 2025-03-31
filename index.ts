import colors from 'yoctocolors';

const colorMarkers = [
	...Object.keys(colors).filter((key) => key !== 'Format'),
] as const as ReadonlyArray<ColorMarker>;

type ColorMarker = Exclude<keyof typeof colors, 'Format'>;

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/**
 * template literal function for coloring parts of console output using coloration markers <br>
 * Usage: dye\`Default \${"red"}<span style="color: red">This is Red </span> \${"green"}
 * <span style="color: green">Green numbers: \${420} </span> \${"reset"} And this is back to normal.
 * \${arbitraryValue} can be included as well.\`
 * @param strings an array of all the substrings that come before, after and between args, in order
 * @param args can be either numbers, arbitrary strings or {@link ColorMarker}, marking the start of coloration.
 */
export const dye = (
	strings: TemplateStringsArray,
	...args: (ColorMarker | Primitive | Record<PropertyKey, unknown>)[]
) =>
	args.length
		? strings.reduce(
				(prev, cur, i) =>
					i - 1 < 0
						? prev + cur
						: colorMarkers.includes(args[i - 1] as ColorMarker)
							? prev + colors[args[i - 1] as ColorMarker](cur)
							: prev +
								cur +
								(typeof args[i - 1] === 'object'
									? JSON.stringify(args[i - 1], null, 2)
									: (args[i - 1]?.toString() ?? 'undefined')),
				'',
			)
		: strings.reduce((prev, cur) => prev + cur);
