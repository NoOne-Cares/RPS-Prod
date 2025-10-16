import { AsyncHandler } from "../utils/AysncHandler";
import { randomBytes } from "crypto";
import { SiweMessage } from 'siwe';


const nonceHandler = AsyncHandler(async (req, res) => {
    const nonce = randomBytes(16).toString('hex');
    res.cookie('siwe-nonce', nonce, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.send(nonce);

})

const verifyHandler = AsyncHandler(async (req, res) => {
    const { message, signature } = req.body;
    const nonce = req.cookies['siwe-nonce'];

    if (!message || !signature) {
        return res.status(400).json({ message: 'Missing message, signature' });
    }
    if (!nonce) {
        return res.status(400).json({ message: "Nonce is missing" });
    }

    const siweMessage = new SiweMessage(message);
    const result = await siweMessage.verify({ signature, nonce });

    if (!result.success) {
        return res.status(401).json({ message: 'Invalid signature' });
    }

    res.cookie('siwe-session', siweMessage.address, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        secure: true
    });

    return res.status(200).json({ ok: true });
});

const logoutHandler = AsyncHandler(async (req, res) => {
    res.clearCookie('siwe-session', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });

    return res.status(200).json({ message: 'Logged out successfully' });
});


const meHandler = AsyncHandler(async (req, res) => {
    const address = req.cookies['siwe-session'];
    if (!address) {
        return res.status(401).json({ authenticated: false });
    }
    return res.status(200).json({ authenticated: true, address });
});
const running = AsyncHandler(async (req, res) => {
    return res.status(200).json({ msg: "server is up and running" });
});

export { verifyHandler, nonceHandler, logoutHandler, meHandler, running }