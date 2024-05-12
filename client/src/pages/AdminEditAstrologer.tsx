/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AddAstrologersValidationSchema } from '../schemas/AddAstrologersValidationSchema';
import { BASE_URL } from '../config/constant';
import EditImage from '../components/imageUpload/EditImage';
import { useUpdateAstrologerMutation } from '../features/api/apiSlice';


const initialValues = {
  _id: "",
  name: "",
  email: "",
  languages: "",
  specialities: "",
  profileImageUrl: "",
  gender: "",
};

interface Astrologer {
  _id?: string;
  profileImageUrl: string;
  name: string;
  email: string;
  gender: string;
  languages: string;
  specialities: string;
}

const AdminEditAstrologer = () => {
  const [data, setData] = useState<Astrologer>(initialValues)
  console.log("🚀 ~ file: AdminEditAstrologer.tsx:34 ~ AdminEditAstrologer ~ data:", data)
  const [imageChanged, setImageChanged] = useState(false)
  const [dataFetched, setDataFetched] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false)
  const [updateAstrologerMutation] = useUpdateAstrologerMutation()
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-astrologer/${id}`);
        response.data.data.languages = response.data.data.languages.join('')
        response.data.data.specialities = response.data.data.specialities.join('')
        setData(response.data.data);
        values.name = response.data.data.name
        values.email = response.data.data.email
        values.gender = response.data.data.gender
        values.languages = response.data.data.languages
        values.specialities = response.data.data.specialities
        values.profileImageUrl = response.data.data.profileImageUrl
        setDataFetched(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id])

  const imageUpload = async (image: any) => {
    console.log(image, '-=-==-=-=-===-=-=--=');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'trpocbuj');
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/daob5eure/image/upload', {
        method: 'post',
        body: formData,
      })
      const urlData = await res.json()
      console.log(urlData, 'urlData here')
      if (urlData.format === "jpg" || urlData.format === "png") {
        return urlData.url
      } else {
        return false;
      }
    } catch (err: any) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: data,
    validationSchema: AddAstrologersValidationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async (values, action) => {
      console.log("🚀 ~ file: AdminEditAstrologer.tsx:89 ~ onSubmit: ~ values:", values)
      let image = values.profileImageUrl
      values._id = id
      setLoading(true)
      if (imageChanged) {
        image = await imageUpload(values.profileImageUrl);
      }
      values.profileImageUrl = image;

      try {
        await updateAstrologerMutation(values);
        setLoading(false)
        navigate('/home')
      } catch (error: any) {
        toast.error(error.message)
        setLoading(false)
      }
    }
  })
  return (
    <>
      {
        dataFetched && (
          <>
            <h1 className="text-2xl  font-bold font-serif pt-6 text-center">EDIT ASTROLOGER</h1>
            <div className="flex justify-center md:px-10 md:block">
              <form className='mt-4' onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <div className='w-full'>
                    <label htmlFor='name' className='block text-sm font-medium'>
                      Name:
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter the name of astrologer'
                      defaultValue={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (<p className='text-red-700'>{errors.name}</p>) : null}
                  </div>
                  <div className='w-full'>
                    <label htmlFor='email' className='block text-sm font-medium '>
                      Email:
                    </label>
                    <input
                      type='text'
                      id='email'
                      name='email'
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter the email'
                      defaultValue={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (<p className='text-red-700'>{errors.email}</p>) : null}
                  </div>
                  <div className="w-full">
                    <label htmlFor="gender" className="block text-sm font-medium ">
                      Gender:
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="mt-1 p-2 w-full border rounded-md"
                      defaultValue={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && touched.gender ? (
                      <p className="text-red-700">{errors.gender}</p>
                    ) : null}
                  </div>
                  <div className='w-full'>
                    <label htmlFor='languages' className='block text-sm font-medium'>
                      Languages (seperate each languages using commas) :
                    </label>
                    <input
                      type='text'
                      id='languages'
                      name='languages'
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter the languages'
                      defaultValue={values.languages}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.languages && touched.languages ? (<p className='text-red-700'>{errors.languages}</p>) : null}
                  </div>
                  <div className='w-full'>
                    <label htmlFor='specialities' className='block text-sm font-medium '>
                      Specialities (seperate each languages using commas):
                    </label>
                    <input
                      type='text'
                      id='specialities'
                      name='specialities'
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter the specialities of Astrologer'
                      defaultValue={values.specialities}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.specialities && touched.specialities ? (<p className='text-red-700'>{errors.specialities}</p>) : null}
                  </div>
                  <div className='mb-4 flex gap-2 justify-evenly'>
                    <div className='w-3/4'>
                      <EditImage id='profileImageUrl' title='Click to insert Image' changed={setImageChanged} image={data.profileImageUrl} handleBlur={handleBlur} setFieldValue={setFieldValue} errors={errors} touched={touched} />
                    </div>
                  </div>
                  <div className='text-center'>
                    <button className='bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-900' type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )
      }

    </>
  )
}

export default AdminEditAstrologer