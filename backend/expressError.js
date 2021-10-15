/** Extends the normal JS error */

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}

/** 404 NOT FOUND */

class NotFoundError extends ExpressError {
    constructor(message = 'Error: Not Found') {
        super(message, 404)
    }
}

/** 401 UNAUTHORIZED */

class UnauthorizedError extends ExpressError {
    constructor(message = 'Error: Unauthorized') {
        super(message, 401);
    }
}

/** 400 BAD REQUEST */

class BadRequestError extends ExpressError {
    constructor(message = 'Error: Bad Request') {
        super(message, 400);
    }
}

/** 403 BAD REQUEST/FORBIDDEN */

class ForbiddenError extends ExpressError {
    constructor(message = 'Error: Bad Request') {
        super(message, 403);
    }
}

module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError
};