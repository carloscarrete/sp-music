import { Formik } from "formik";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";

interface RegisterValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterPage = () => {

  const { register } = useAuthStore();

  const onRegister = async (fullName: string, email: string, password: string) => {
    const res = await register(fullName, email, password);
    if (!res) {
      console.log('An error occurred during registration');
    }
  }


  return (
    <Formik<RegisterValues>
      initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
      validate={(values: RegisterValues) => {
        const errors: RegisterErrors = {};

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'The email address is not valid';
        }
        if (values.password.length < 6) {
          errors.password = 'The password must be at least 6 characters long';
        }
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'The passwords do not match'
        }
        if (values.fullName.length < 3) {
          errors.fullName = 'The name must be at least 3 characters long';
        }
        return errors;
      }}
      onSubmit={(values) => onRegister(values.fullName, values.email, values.password)}>
      {({ values, handleChange, handleSubmit, errors, touched, isSubmitting, dirty }) => (
        <div className="h-screen flex bg-gradient-to-br from-gray-800 to-black items-center justify-center">
          <div className="h-7/8 flex flex-col p-6 justify-center bg-zinc-900 w-96 rounded-2xl text-white shadow-lg">
            <h1 className="text-4xl font-extrabold mb-6 text-center">Register</h1>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Full name:</label>
                <input
                  value={values.fullName}
                  onChange={handleChange('fullName')}
                  type="text"
                  placeholder="E.g.: Gabriel Sanchez"
                  className="text-white bg-zinc-800 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-500" />
                {errors.email && touched.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Email:</label>
                <input
                  value={values.email}
                  onChange={handleChange('email')}
                  type="email"
                  placeholder="E.g. : gabriel.s@mail.com"
                  className="text-white bg-zinc-800 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-500" />
                {errors.email && touched.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Password:</label>
                <input
                  value={values.password}
                  onChange={handleChange('password')}
                  type="password"
                  placeholder="E.g.: YourPassword123"
                  className="text-white bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                />
                {errors.password && touched.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Confirm pasword:</label>
                <input
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  type="password"
                  placeholder="E.g.: YourPassword123"
                  className="text-white bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                )}
              </div>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                disabled={!dirty || isSubmitting}
                className="bg-green-500 text-white font-bold rounded-lg p-3 mt-3 hover:bg-green-400 transition-colors"
              >
                Register
              </button>
            </div>
            <div className="text-white text-center mt-3">
              <p>
                Do you already have an account?
                <Link
                  to="/auth/login"
                  className="text-green-500 font-semibold ml-1 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
