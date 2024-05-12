import * as yup from 'yup';

export const AddAstrologersValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  languages: yup.string().required('Languages are required'),
  specialities: yup.string().required('Specialities are required'),
  profileImageUrl: yup.mixed()
  .required('Image is required'),
});
