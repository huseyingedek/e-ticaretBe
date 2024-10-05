import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    'string.base': 'İsim bir metin olmalıdır',
    'string.empty': 'İsim boş olamaz',
    'string.min': 'İsim en az 2 karakter olmalıdır',
    'string.max': 'İsim en fazla 30 karakter olmalıdır',
    'any.required': 'İsim gereklidir',
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.base': 'Soyisim bir metin olmalıdır',
    'string.empty': 'Soyisim boş olamaz',
    'string.min': 'Soyisim en az 2 karakter olmalıdır',
    'string.max': 'Soyisim en fazla 30 karakter olmalıdır',
    'any.required': 'Soyisim gereklidir',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Geçerli bir email adresi girin',
    'string.empty': 'Email boş olamaz',
    'any.required': 'Email gereklidir',
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Geçerli bir telefon numarası girin (10 hane)',
      'string.empty': 'Telefon numarası boş olamaz',
      'any.required': 'Telefon numarası gereklidir',
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Şifre en az 6 karakter olmalıdır',
    'string.empty': 'Şifre boş olamaz',
    'any.required': 'Şifre gereklidir',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Geçerli bir email adresi girin',
    'string.empty': 'Email boş olamaz',
    'any.required': 'Email gereklidir',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Şifre en az 6 karakter olmalıdır',
    'string.empty': 'Şifre boş olamaz',
    'any.required': 'Şifre gereklidir',
  }),
});
