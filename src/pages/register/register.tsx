import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser, selectUserState } from '../../services/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, registrationError } = useAppSelector(selectUserState);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={registrationError}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};