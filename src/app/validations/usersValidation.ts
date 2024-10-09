import Joi from 'joi';

export const userSchema = Joi.object({
    user: Joi.object({
        id: Joi.string().optional().messages({
            'string.base': 'ID bir metin olmalıdır',
        }),
        iat: Joi.number().optional().messages({
            'number.base': 'IAT bir sayı olmalıdır',
        }),
        exp: Joi.number().optional().messages({
            'number.base': 'EXP bir sayı olmalıdır',
        }),
        name: Joi.string().min(2).max(30).optional().messages({
            'string.base': 'İsim bir metin olmalıdır',
            'string.empty': 'İsim boş olamaz',
            'string.min': 'İsim en az 2 karakter olmalıdır',
            'string.max': 'İsim en fazla 30 karakter olmalıdır',
        }),
        lastname: Joi.string().min(2).max(30).optional().messages({
            'string.base': 'Soyisim bir metin olmalıdır',
            'string.empty': 'Soyisim boş olamaz',
            'string.min': 'Soyisim en az 2 karakter olmalıdır',
            'string.max': 'Soyisim en fazla 30 karakter olmalıdır',
        }),
        email: Joi.string().email().optional().messages({
            'string.email': 'Geçerli bir email adresi girin',
            'string.empty': 'Email boş olamaz',
        }),
        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .optional()
            .messages({
                'string.pattern.base': 'Geçerli bir telefon numarası girin (10 hane)',
                'string.empty': 'Telefon numarası boş olamaz',
            }),
    }).optional().messages({
        'object.base': 'User alanı bir nesne olmalıdır',
        'any.required': 'User alanı gereklidir',
    }),
    name: Joi.string().min(2).max(30).optional().messages({
        'string.base': 'İsim bir metin olmalıdır',
        'string.empty': 'İsim boş olamaz',
        'string.min': 'İsim en az 2 karakter olmalıdır',
        'string.max': 'İsim en fazla 30 karakter olmalıdır',
    }),
    lastName: Joi.string().min(2).max(30).optional().messages({
        'string.base': 'Soyisim bir metin olmalıdır',
        'string.empty': 'Soyisim boş olamaz',
        'string.min': 'Soyisim en az 2 karakter olmalıdır',
        'string.max': 'Soyisim en fazla 30 karakter olmalıdır',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Geçerli bir email adresi girin',
        'string.empty': 'Email boş olamaz',
    }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Geçerli bir telefon numarası girin (10 hane)',
            'string.empty': 'Telefon numarası boş olamaz',
        }),
});