"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astrologyRoutes = void 0;
const express_1 = require("express");
const astrologyController_1 = require("../controllers/astrologyController");
const astrologyRoutes = () => {
    const { astrologerSignup, getAstrologers, editAstrologers, adminLogin, getAstrologer } = (0, astrologyController_1.astrologyController)();
    const router = (0, express_1.Router)();
    router.route('/login').post(adminLogin);
    router.route('/astrologers/register').post(astrologerSignup);
    router.route('/astrologers').get(getAstrologers);
    router.route('/get-astrologer/:id').get(getAstrologer);
    router.route('/astrologers/:id').put(editAstrologers);
    return router;
};
exports.astrologyRoutes = astrologyRoutes;
