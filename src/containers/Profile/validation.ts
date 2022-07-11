import * as yup from 'yup';
import { stringRequiredYup } from '@validation/common';
import { FORM_FIELDS_ERRORS } from '@constants/messages.constants';

export const FIELD_NAMES = {
  DISPLAY_NAME: 'displayName',
  PHOTO_URL: 'photoURL',
};

export const schema = yup.object().shape({
  [FIELD_NAMES.DISPLAY_NAME]: stringRequiredYup(1, 20),
  [FIELD_NAMES.PHOTO_URL]: yup.string().required(FORM_FIELDS_ERRORS.REQUIRED),
});
