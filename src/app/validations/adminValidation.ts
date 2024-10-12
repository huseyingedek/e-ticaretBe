import Joi from "joi";

export const adminSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.alphanum': 'Name must only contain alpha-numeric characters',
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is a required field'
    }),
    lastName: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': 'Last name should be a type of text',
        'string.alphanum': 'Last name must only contain alpha-numeric characters',
        'string.empty': 'Last name cannot be an empty field',
        'string.min': 'Last name should have a minimum length of {#limit}',
        'string.max': 'Last name should have a maximum length of {#limit}',
        'any.required': 'Last name is a required field'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field'
    }),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
        'string.base': 'Phone should be a type of text',
        'string.pattern.base': 'Phone must be a valid 10-digit number',
        'string.empty': 'Phone cannot be an empty field',
        'any.required': 'Phone is a required field'
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
        'string.base': 'Password should be a type of text',
        'string.pattern.base': 'Password must be between 6 and 30 characters and contain only letters and numbers',
        'string.empty': 'Password cannot be an empty field',
        'any.required': 'Password is a required field'
    }),
}).unknown(true);