import { NextFunction, Request, Response } from "express";
import { Astrologer } from "../model/astrologerSchema";
import { verifyToken } from "../utils/jwt/verifyToken";
import { IDecodedInterface } from "../interfaces/IDecodedInterface";
import jwt from "jsonwebtoken";

export const astrologyController = () => {
  return {
    adminLogin: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        console.log(
          "🚀 ~ file: astrologyController.ts:13 ~ adminLogin:async ~ data:",
          data
        );
        if (
          data.email === String(process.env.ADMIN_USERNAME) &&
          data.password === String(process.env.ADMIN_PASSWORD)
        ) {
          let payload = {
            email: data?.email!,
          };
          const accessToken = jwt.sign(
            payload,
            String(process.env.ACCESS_TOKEN_SECRET),
            { expiresIn: "1h" }
          );
          console.log(accessToken, "token");

          res.cookie("admin_jwt", accessToken, {
            httpOnly: true,
          });
          res.status(200).json({
            success: true,
            data,
            message: "Admin login successful",
          });
        } else {
          throw new Error("Email or Password not correct");
        }
      } catch (error) {
        next(error);
      }
    },

    astrologerSignup: async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const data = req.body;
        const response = await Astrologer.create(data);
        if (response) {
          res.status(201).json({
            success: true,
            data: response,
            message: "Astrologer created",
          });
        } else {
          throw new Error("Could not create Astrologer");
        }
      } catch (error) {
        next(error);
      }
    },

    getAstrologers: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await Astrologer.find({});
        if (response) {
          res.status(200).json({
            success: true,
            data: response,
            message: "Astrologers Found",
          });
        } else {
          throw new Error("No Astrologers Found");
        }
      } catch (error) {
        next(error);
      }
    },

    getAstrologer: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const response = await Astrologer.findById(id);
        if (response) {
          res.status(200).json({
            success: true,
            data: response,
            message: "Astrologer Found",
          });
        } else {
          throw new Error("No Astrologers Found");
        }
      } catch (error) {
        next(error);
      }
    },

    editAstrologers: async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const {_id, ...rest} = req.body;
          console.log("🚀 ~ file: astrologyController.ts:110 ~ astrologyController ~ rest:", rest)
          const updatedData = await Astrologer.findByIdAndUpdate(_id, rest );
          console.log("🚀 ~ file: astrologyController.ts:111 ~ astrologyController ~ updatedData:", updatedData)
          if (updatedData) {
            const response = await Astrologer.find({});
            res.status(200).json({
              success: true,
              data: response,
              message: "Astrologers Updated",
            });
          } else {
            throw new Error("No Astrologers Found");
          }
      } catch (error) {
        next(error);
      }
    },
  };
};
