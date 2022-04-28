import Joi from "joi";

 export const Registerschema=Joi.object({
    fullname:Joi.string().required(),
    email:Joi.string().email(),
    password:Joi.string().required().min(8).max(30)
})
