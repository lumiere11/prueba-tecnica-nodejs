const { z } = require('zod');

const userRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6)
});

const userLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

module.exports = {
  userRegisterSchema,
  userLoginSchema
};
