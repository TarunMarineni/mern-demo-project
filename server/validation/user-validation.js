const z = require("zod");

const userSignUpValidation = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be 3 or more characters long" })
    .max(30, { message: "Name must be 30 or fewer characters long" })
    .trim(),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be 6 or more characters long" }),

  phone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .length(10, { message: "Phone number must be exactly 10 characters long" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain only digits",
    }),
});

const userSignInValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be 6 or more characters long" }),
});

module.exports = { userSignInValidation, userSignUpValidation };
