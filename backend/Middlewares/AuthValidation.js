const Joi = require('joi');

// Validation schemas
const schemas = {
  // Registration validation schema
  register: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'any.required': 'Password is required'
      }),
    
    fullName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 50 characters',
        'any.required': 'Full name is required'
      }),
    bio: Joi.string()
      .max(200)
      .messages({
        'string.max': 'Bio cannot exceed 200 characters'
      }),
      
  }),

  // Login validation schema
  login: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  // Forgot password validation schema
  forgotPassword: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      })
  }),

  // Reset password validation schema
  resetPassword: Joi.object({
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'any.required': 'Password is required'
      })
  }),

  // Update password validation schema
  updatePassword: Joi.object({
    currentPassword: Joi.string()
      .required()
      .messages({
        'any.required': 'Current password is required'
      }),
    
    newPassword: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
      .messages({
        'string.min': 'New password must be at least 8 characters',
        'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, and one number',
        'any.required': 'New password is required'
      })
  })
};

// Validation middleware creator
const validate = (validationSchema) => {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });
    
    if (!error) {
      return next();
    }
    
    const errors = {};
    
    error.details.forEach((detail) => {
      const key = detail.path[0];
      errors[key] = detail.message;
    });
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  };
};

// Export validation middlewares
module.exports = {
  validateRegister: validate(schemas.register),
  validateLogin: validate(schemas.login),
  validateForgotPassword: validate(schemas.forgotPassword),
  validateResetPassword: validate(schemas.resetPassword),
  validateUpdatePassword: validate(schemas.updatePassword)
};