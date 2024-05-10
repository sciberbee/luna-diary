const authMiddleware = (req, res, next) => {
    const { userId, password } = req.body; // Destructure user ID and password from the request body
    if (userId === process.env.API_USERID && password === process.env.API_PASSWORD) { // Check if the user ID and password match the expected values
        console.log("[AUTH-MIDDLEWARE] Authorized User");
        next();
    }
    else {
        console.log("[AUTH-MIDDLEWARE] Not Authorized User");
        res.status(401).json({ error: "Not Authorized" });
    }
}

module.exports = authMiddleware;