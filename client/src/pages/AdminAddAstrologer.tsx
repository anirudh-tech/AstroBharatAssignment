/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useAddAstrologerMutation } from "../features/api/apiSlice";
import { AddAstrologersValidationSchema } from "../schemas/AddAstrologersValidationSchema";
import toast from "react-hot-toast";
import ImageUpload from "../components/imageUpload/ImageUpload";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  languages: "",
  specialities: "",
  profileImageUrl: "",
  gender: "",
};
const AdminAddAstrologer = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const [addAstrologerMutation, { isLoading }] = useAddAstrologerMutation();



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
    initialValues,
    validationSchema: AddAstrologersValidationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async (values, action) => {
      setLoading(true)
      const image = await imageUpload(values.profileImageUrl);
      values.profileImageUrl = image;
      try {
        await addAstrologerMutation(values);
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
        isLoading || loading ? (
          <div className='absolute inset-0 bg-black/60 w-full h-full flex justify-center'>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-center'>
                <BeatLoader
                  color="#36d7b7"
                  loading
                  margin={0}
                  size={15}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl  font-bold font-serif pt-6 text-center">ADD ASTROLOGER</h1>
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
                      value={values.name}
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
                      value={values.email}
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
                      value={values.gender}
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
                      value={values.languages}
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
                      value={values.specialities}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.specialities && touched.specialities ? (<p className='text-red-700'>{errors.specialities}</p>) : null}
                  </div>
                  <div className='mb-4 flex gap-2 justify-evenly'>
                    <div className='w-3/4'>
                      <ImageUpload id='profileImageUrl' title='Click to insert Image' handleBlur={handleBlur} setFieldValue={setFieldValue} errors={errors} touched={touched} />
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

export default AdminAddAstrologer