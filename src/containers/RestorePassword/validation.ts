import * as yup from 'yup';
import { emailYup } from '@validation/common';

export const FIELD_NAMES = {
  EMAIL: 'email',
};

export const schema = yup.object().shape({
  [FIELD_NAMES.EMAIL]: emailYup,
});
