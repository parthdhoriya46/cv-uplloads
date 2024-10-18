import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  position: yup.string().required('Position is required'),
  imageUrl: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'File too large', (value) => !value[0] || value[0].size <= 2000000) // Max 2MB
    .test('fileType', 'Only images are allowed', (value) =>
      !value[0] ? true : ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
    ),
  cvUrl: yup
    .mixed()
    .required('CV is required')
    .test('fileSize', 'File too large', (value) => !value[0] || value[0].size <= 5000000) // Max 5MB
    .test('fileType', 'Only PDF or Word documents are allowed', (value) =>
      !value[0]
        ? true
        : ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value[0].type)
    )
});

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data) => {
    const formData = {
      ...data,
      cvUrl: data.cvUrl[0],
      imageUrl: data.imageUrl[0]
    }
    
    try {
      console.log(formData)
      await axios.post('http://localhost:8080/employee',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.log(error,'Errors')
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div>
        <label>Name:</label>
        <input {...register('name')} placeholder="Enter employee name" />
        <p>{errors.name?.message}</p>
      </div>

      <div>
        <label>Email:</label>
        <input {...register('email')} placeholder="Enter employee email" />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label>Phone:</label>
        <input {...register('phone')} placeholder="Enter phone number" />
        <p>{errors.phone?.message}</p>
      </div>

      <div>
        <label>Position:</label>
        <input {...register('position')} placeholder="Enter employee position" />
        <p>{errors.position?.message}</p>
      </div>

      <div>
        <label>Image (jpg/png, max 2MB):</label>
        <input type="file" {...register('imageUrl')} />
        <p>{errors.imageUrl?.message}</p>
      </div>

      <div>
        <label>CV (PDF, max 5MB):</label>
        <input type="file" {...register('cvUrl')} />
        <p>{errors.cvUrl?.message}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddEmployee;
