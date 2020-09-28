const log = (...toLog: any): void | null => process.env.DEBUG === 'true' ? console.log(...toLog) : null;

export default log;

