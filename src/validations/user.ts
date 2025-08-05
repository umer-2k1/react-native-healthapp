import * as z from 'zod';
import {differenceInYears} from 'date-fns';

const UserSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .min(3, 'First name must be at least 3 characters long'),
  last_name: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .min(3, 'Last name must be at least 3 characters long'),
  email: z.string().email({message: 'Invalid email address'}),
});

const UserProfileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  email: z.string().email({message: 'Invalid email address'}),
  gender: z.string().trim().min(1, 'Gender is required'),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      dob => {
        const birthDate = new Date(dob);
        return differenceInYears(new Date(), birthDate) >= 18;
      },
      {message: 'You must be at least 18 years old'},
    ),
});

export {UserProfileSchema, UserSchema};
