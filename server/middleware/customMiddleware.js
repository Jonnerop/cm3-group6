const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    res.status(500);
    res.json({ error: error.message });
};

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
};

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger
};