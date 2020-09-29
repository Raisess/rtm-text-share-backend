export function validateMasterKey(req: any, res: any, next: Function): boolean {
	const key: string | undefined = req.query.key;

	if (key === process.env.MASTER_KEY) {
		return next();
	}

	return res.status(401).json({
		log:     'invalid key',
		success: false
	});
}

