import * as yup from 'yup';
import { FORM_FIELDS_ERRORS } from '@constants/messages.constants';

export const emailYup = yup
  .string()
  .trim()
  .email(FORM_FIELDS_ERRORS.EMAIL_INCORRECT)
  .required(FORM_FIELDS_ERRORS.REQUIRED)
  .matches(/^[a-zA-Z@.0-9_-]+$/, FORM_FIELDS_ERRORS.ONLY_LATIN);

export const stringRequiredYup = (min: number, max: number) => yup
  .string()
  .trim()
  .required(FORM_FIELDS_ERRORS.REQUIRED)
  .min(min, FORM_FIELDS_ERRORS.MIN_LENGTH.replace('[min]', String(min)))
  .max(max, FORM_FIELDS_ERRORS.SHOULD_BE_NO_MORE.replace('[max]', String(max)));
