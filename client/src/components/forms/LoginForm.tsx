// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationSchema } from '../../schemas/ValidationSchema';
// import { AppDispatch } from '../../redux/store';
import { useFormik } from 'formik';
import { useAdminLoginMutation } from '../../features/api/apiSlice';
interface IValues {
  email: string;
  password: string;
}
const LoginForm = () => {
  const [adminLogin] = useAdminLoginMutation()
  // const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  }


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async (values: IValues, action) => {
      // const res = await dispatch(login(values))
      const { data }= await adminLogin(values)
      const accessToken = data.admin_jwt;

      if (accessToken) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); 

        const cookieString = `admin_jwt=${accessToken}; path=/; expires=${expirationDate.toUTCString()}; Secure; SameSite=None`;

        document.cookie = cookieString;
      }
      console.log("🚀 ~ file: LoginForm.tsx:27 ~ onSubmit: ~ res:", data)
      navigate('/')
    }
  })

  return (
    <div className='w-2/3'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-black'>
            Email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className='mt-1 p-2 w-full border rounded-md'
            placeholder='Enter your email'
            required
          />
          {errors.email && touched.email ? (<p className='text-red-700'>{errors.email}</p>) : null}
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium text-black'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className='mt-1 p-2 w-full border rounded-md'
            placeholder='Enter your password'
            required
          />
          {errors.password && touched.password ? (
            <p className='text-red-700'>{errors.password}</p>
          ) : null}
        </div>
        <button
          type='submit'
          className='bg-green-400 w-full text-white px-8 py-2 rounded-md hover:bg-green-600 focus:outline-none'
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;