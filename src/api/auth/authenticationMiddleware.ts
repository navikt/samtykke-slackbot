import { NextFunction, Request, RequestHandler, Response } from "express";
import { UnauthorizedError } from "./UnauthorizedError";
import * as jose from 'jose'
import config from "../../config";

export const authAzureToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerSchema = req.headers.authorization
        if (!bearerSchema) throw new UnauthorizedError('No bearer schema present')

        const token = bearerSchema.split(' ')[1]
        if (!token) throw new UnauthorizedError('No token in bearer schema')

        const { payload, protectedHeader } = await jose.jwtVerify(
            token,
            jose.createRemoteJWKSet(new URL(config.azure.jwksURI!)),
            {
                issuer: config.azure.issuer,
                audience: config.azure.audience
            }
        )

        if (!payload || !protectedHeader) throw new UnauthorizedError('Authentication is not valid!')

        next()
    } catch (error) {
        if (error instanceof UnauthorizedError) res.sendStatus(401)
        else res.sendStatus(500)
    }
}