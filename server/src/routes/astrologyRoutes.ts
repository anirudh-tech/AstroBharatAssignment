import { Router } from "express";
import { astrologyController } from "../controllers/astrologyController";

export const astrologyRoutes = () => {
  const {astrologerSignup,getAstrologers,editAstrologers,adminLogin,getAstrologer} = astrologyController()
  const router = Router();

  router.route('/login').post(adminLogin)

  router.route('/astrologers/register').post(astrologerSignup)

  router.route('/astrologers').get(getAstrologers)

  router.route('/get-astrologer/:id').get(getAstrologer)

  router.route('/astrologers/:id').put(editAstrologers)
  return router;
}