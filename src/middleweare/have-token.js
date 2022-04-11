export async function haveToken(req, res, next) {


    let token = req.cookies.token;

    if (token) {
        res.redirect("/todoslospartidos");
    }
    next();




};