import { Router } from "express";
import { logoutHandler, meHandler, nonceHandler, running, verifyHandler } from "../controllers/Auth.controler";

const router = Router()
router.route('/nonce').get(nonceHandler)
router.route('/verify').post(verifyHandler)
router.route('/logout').get(logoutHandler)
router.route('/isAuthinticated').get(meHandler)
router.route('/running').get(running)
export default router