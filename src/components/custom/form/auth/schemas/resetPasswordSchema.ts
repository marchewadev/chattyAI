import * as z from 'zod';

export default z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email('This is not a valid email')
});
