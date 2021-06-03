import { IUser } from "../types/types";
import Joi from "joi";
import JoiDate from "@joi/date";

const joi = Joi.extend(JoiDate);

export const validateUser = function (obj: IUser): Record<string, any> {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "dev"] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .error(new Error("password is too short"))
      .required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    dateOfBirth: joi
      .date()
      .format(["YYYY/MM/DD", "YYYY-MM-DD"])
      .error(new Error("Invalid date. Date format 'YYYY/MM/DD', 'YYYY-MM-DD' "))
      .required(),
    gender: Joi.any()
      .valid("M", "Male", "Female", "F")
      .error(new Error("Gender should be Male or M or Female or F"))
      .required(),
  });
  return schema.validate(obj);
};
