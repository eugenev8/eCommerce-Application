import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import RegisterForm from './RegisterForm';
import { setupStore } from '../../../store';

const store = setupStore();
describe('RegisterForm', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );
  });

  it('displays the Sign up header', () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );
    const header = screen.getByText('Sign up');
    expect(header).toBeInTheDocument();
  });
});
