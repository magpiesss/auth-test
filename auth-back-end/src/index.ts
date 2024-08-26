// @ts-ignore
import express, { Request, Response } from 'express';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import jwt from 'jsonwebtoken';
import {initialiseDatabase} from "./initialise-database";
import {User} from "./models/User";
import {comparePassword, hashPassword, isEmailValid, isPasswordValid} from "./utils/password-utils";

type UserToken = {
    userId: number;
};

(async () => {
    dotenv.config();

    await initialiseDatabase();

    const app = express();
    const port = process.env.PORT || 3000;
    const jwtSecret = process.env.JWT_SECRET || 'not_very_secret';
    const corsAllowedOrigin = process.env.CORS_ALLOWED_ORIGIN || 'http://localhost:3000';

    app.use(cors({ origin: corsAllowedOrigin }))
        .use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('App is online!');
    });

    app.post('/user/login', async (req: Request, res: Response) => {
        const existingUser = await User.findOne({ where: { email: req.body.email }  });
        if (!existingUser) return res.status(400).send(JSON.stringify({ error: 'Email or password is incorrect.' }));

        const passwordCorrect = await comparePassword(existingUser.password, req.body.password);

        if (!passwordCorrect) return res.status(400).send(JSON.stringify({ error: 'Email or password is incorrect.' }));

        const token = jwt.sign({ userId: existingUser.id }, jwtSecret);

        res.send(JSON.stringify({ token }));
    });

    app.post('/user/register', async (req: Request, res: Response) => {
        const existingUser = await User.findOne({ where: { email: req.body.email }  });
        if (existingUser) return res.status(400).send(JSON.stringify({ error: 'Email already in use.' }));
        if (!isEmailValid(req.body.email)) return res.status(400).send(JSON.stringify({ error: 'Email is not in the correct format.' }));
        if (!isPasswordValid(req.body.password)) return res.status(400).send(JSON.stringify({ error: 'Password must be at least 8 characters.' }));

        const hashedPassword = await hashPassword(req.body.password);

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        res.send(JSON.stringify(newUser));
    });

    app.get('/user', async (req: Request, res: Response) => {
        const authorisationHeader = req.headers['authorization'];
        if (!authorisationHeader) return res.status(401).send('Unauthorised');

        const token = authorisationHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtSecret) as UserToken;

        if (!decodedToken) return res.status(401).send('Unauthorised');

        const foundUser = await User.findByPk(decodedToken.userId);
        if (!foundUser) return res.status(404).send('User not found');

        res.send(JSON.stringify(foundUser));
    });

    app.listen(port, () => {
        console.log(`App is listening on port ${port}.`)
    });
})()
