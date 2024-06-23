import React, { useState } from 'react';
import validator from 'validator';
import { BiLoaderCircle } from 'react-icons/bi'; 
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); 


  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'identifier':
        if (!value) {
          return 'Username or Email is required.';
        }
        return validator.isEmail(value) || value.length >= 3 ? '' : 'Enter a valid email or username.';
      case 'password':
        return value.length >= 8 ? '' : 'Must be at least 8 characters.';
      default:
        return '';
    }
  };


  const handleInputChange = (fieldName, value) => {
    switch (fieldName) {
      case 'identifier':
        setIdentifier(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }


    const error = validateField(fieldName, value);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.values(validationErrors).every((error) => error === '')) {
      
      setIsLoading(true);
      try {
        
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Form is valid, proceed with submission.');
        
      } catch (error) {
        console.error('Error during form submission', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };


  const validateForm = () => {
    const newErrors = {};


    newErrors.identifier = validateField('identifier', identifier);
    newErrors.password = validateField('password', password);

    return newErrors;
  };

  return (
    <div className='shadow-2xl pt-8 pl-4 pr-4 pb-2 rounded-xl'>
      <h1 className='text-5xl mb-6'>Welcome Back</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className="Form-Field mb-4 relative">
          <label htmlFor="identifier">Username</label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            type="text"
            name="identifier"
            id="identifier"
            placeholder='Enter your username or email'
            value={identifier}
            onChange={(e) => handleInputChange('identifier', e.target.value)}
            onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, identifier: validateField('identifier', identifier) }))}
          />
          {errors.identifier && <p className="text-red-500 absolute -top-[3px] right-0 mt-1">{errors.identifier}</p>}
        </div>
        <div className="Form-Field mb-4 relative">
          <label htmlFor="password">Password</label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            type="password"
            name="password"
            id="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, password: validateField('password', password) }))}
          />
          <div className="flex items-center mt-1 absolute top-0 -right-[23px]">
            {errors.password && <p className="text-red-500 relative right-6 -top-[3px]">{errors.password}</p>}
          </div>
        </div>
        <div className="Form-Field flex justify-center">
          <button type="submit" className='mb-4 p-4 bg-red-500 rounded-xl h-[50px] text-white flex items-center justify-center'>
            {isLoading ? <BiLoaderCircle className="animate-spin" /> : 'Login'}
          </button>
        </div>
      </form>
      <div className="text-center">
        <p>Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link></p>
        </div>
    </div>
  );
};

export default LoginForm;