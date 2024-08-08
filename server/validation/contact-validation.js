const z = require("zod");

const contactValidation = z.object({
  username: z.string({ required_error: "User name is required" }).trim(),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  message: z.string({ required_error: "Message is required" }),
});

module.exports = contactValidation;
