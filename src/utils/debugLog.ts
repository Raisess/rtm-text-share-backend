function log(...toLog: any): void | null { 
	return process.env.DEBUG === 'true' ? console.log(...toLog) : null;
}

export default log;

