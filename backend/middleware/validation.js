const { check, validationResult } = require('express-validator');


exports.Validations = (req, res, next) =>
{
    [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name is required'),
        check('email', 'Email is required')
            .isEmail(),
        check('password', 'Password is requried')
            .isLength({ min: 1 })
            .custom((val, { req, loc, path }) => {
                if (val !== req.body.confirm_password) {
                    throw new Error("Passwords don't match");
                } else {
                    return value;
                }
            }),
    ] 
        // var errors = validationResult(req).array();
        // if (errors) {
        //     req.session.errors = errors;
        //     req.session.success = false;
        //    res.json({status: 401, message: "informations incorrect"})
        // } else {
        //     req.session.success = true;
        //     res.json({status: 200, message: " utlisateur crée"})
            
        // }
    
 next()
}
   