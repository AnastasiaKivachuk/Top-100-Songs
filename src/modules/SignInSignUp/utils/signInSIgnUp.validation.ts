import * as yup from 'yup';
import { emailYup, stringRequiredYup } from '@validation/common.valodation';

export const FIELD_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  REMEMBER: 'isRemember',
};

export const schema = yup.object().shape({
  [FIELD_NAMES.EMAIL]: emailYup,
  [FIELD_NAMES.PASSWORD]: stringRequiredYup(6, 50),
});
