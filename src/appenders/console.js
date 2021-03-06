import { TRACE, DEBUG, INFO, WARN, ERROR, FATAL } from "../level/level";
import { isFunction, funcSafetyCheck } from "../util/isFunction";

/* eslint-disable-next-line no-console */
const consoleWarn = (...args) => console.warn(...args);
/* eslint-disable-next-line no-console */
const consoleTrace = (...args) => console.trace(...args);
/* eslint-disable-next-line no-console */
const consoleError = (...args) => console.error(...args);
/* eslint-disable-next-line no-console */
const consoleInfo = (...args) => console.info(...args);
/* eslint-disable-next-line no-console */
const consoleDebug = (...args) => console.debug(...args);

const levelToConsoleTable = {
	[TRACE]: consoleTrace,
	[DEBUG]: consoleDebug,
	[INFO]: consoleInfo,
	[WARN]: consoleWarn,
	[ERROR]: consoleError,
	[FATAL]: consoleError
};

const getLoggingFunctionForLevel = level => levelToConsoleTable[level];

const consoleAppender = layoutFunction =>
	funcSafetyCheck(layoutFunction, `Invalid layout function ${layoutFunction}`, true)(
		isFunction(layoutFunction)
			? (level, date, category, ...args) =>
					getLoggingFunctionForLevel(level)(...layoutFunction(level, date, category, ...args))
			: (level, date, category, ...args) => getLoggingFunctionForLevel(level)(level, date, category, ...args)
	);

export default consoleAppender;
