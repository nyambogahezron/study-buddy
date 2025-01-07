import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterUser from '../query/auth';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!fullName || !username || !email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const res = await RegisterUser({
      email,
      name: fullName,
      username,
      password,
    });

    //  @ts-expect-error no error property in AxiosResponseProps
    if (res && res?.status === 201) {
      toast.success('Account created successfully');
      window.location.href = '/login';
    } else {
      //  @ts-expect-error no error property in AxiosResponseProps
      toast.error(res?.response?.data?.error || 'An error occurred');
    }
  };
  return (
    <main className='sign-up auth layout '>
      <ToastContainer />
      <div className='container'>
        <div className='layout__box'>
          <div className='layout__boxHeader'>
            <div className='layout__boxTitle'>
              <h3>Register</h3>
            </div>
          </div>
          <div className='layout__body'>
            <h2 className='auth__tagline'>Find your study partner</h2>

            <form className='form' action='#' onSubmit={handleSubmit}>
              <div className='form__group'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                  id='fullName'
                  name='fullName'
                  type='text'
                  placeholder='e.g. John Doe'
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>
              <div className='form__group '>
                <label htmlFor='room_name'>Username</label>
                <input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='e.g. john_doe'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className='form__group '>
                <label htmlFor='room_name'>Email</label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className='form__group'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <div className='form__group'>
                <label htmlFor='confirm_password'>Confirm Password</label>
                <input
                  id='confirm_password'
                  name='confirm_password'
                  type='password'
                  placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>

              <button className='btn btn--main' type='submit'>
                <svg
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                >
                  <title>lock</title>
                  <path d='M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z'></path>
                  <path d='M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z'></path>
                </svg>
                Register
              </button>
            </form>

            <div className='auth__action'>
              <p>Already have an account?</p>
              <Link to='/login' className='btn btn--link'>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
