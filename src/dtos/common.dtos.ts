import React, { ChangeEvent } from 'react';
import {
  Control, FieldErrors, UseFormClearErrors, UseFormHandleSubmit, UseFormSetError,
} from 'react-hook-form';

export type FileResponseDTO = {
  id: number,
  originalName?: string,
  path: string,
  type: string,
  size: number
  duration?: number
}

export type ReturnCommonPropsHooks = {
  onValueChange: (
    _event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>,
    data: any
  ) => void,
  handleSubmit: UseFormHandleSubmit<Record<string, any>>,
  clearErrors: UseFormClearErrors<Record<string, any>>,
  setError: UseFormSetError<Record<string, any>>,
  control: Control<Record<string, any>>,
  errors: FieldErrors<Record<string, any>>,
  isSubmitting: boolean,
}

export type UserResponseDto = {
  id: number
  role: string
  lastName: string
  email?: string
  firstName?: string
  photo?: FileResponseDTO
}
