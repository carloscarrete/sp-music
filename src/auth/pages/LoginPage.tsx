import { Formik } from "formik";
import { useAuthStore } from "../../store/useAuthStore";

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

export const LoginPage = () => {

    const { login } = useAuthStore();

    const onLogin = async ( email: string, password: string) => {
        console.log({ email, password })
        const res = await login(email, password);
        if (!res) {
            console.log('Error al iniciar sesión');
        }
    }


    return (
        <Formik<RegisterValues>
            initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
            validate={(values: RegisterValues) => {
                const errors: RegisterErrors = {};

                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Correo Electronico no valido';
                }
                if (values.password.length < 6) {
                    errors.password = 'La contraseña debe tener al menos 6 caracteres';
                }

                return errors;
            }}
            onSubmit={(values) => onLogin( values.email, values.password)}>
            {({ values, handleChange, handleSubmit, errors, touched, isSubmitting, dirty }) => (
                <div className="h-screen flex bg-gradient-to-br from-gray-800 to-black items-center justify-center">
                    <div className="h-4/5 flex flex-col p-6 justify-center bg-zinc-900 w-96 rounded-2xl text-white shadow-lg">
                        <h1 className="text-4xl font-extrabold mb-6 text-center">Iniciar sesión</h1>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1">Correo electrónico:</label>
                                <input
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    type="email"
                                    placeholder="Ej: ejemplo@correo.com"
                                    className="text-white bg-zinc-800 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-500" />
                                {errors.email && touched.email && (
                                    <span className="text-red-500 text-sm">{errors.email}</span>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1">Contraseña:</label>
                                <input
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    type="password"
                                    placeholder="Ej: ********"
                                    className="text-white bg-zinc-800 p-3 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                                />
                                {errors.password && touched.password && (
                                    <span className="text-red-500 text-sm">{errors.password}</span>
                                )}
                            </div>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                disabled={!dirty || isSubmitting}
                                className="bg-green-500 text-white font-bold rounded-lg p-3 mt-3 hover:bg-green-400 transition-colors"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                        <div className="text-white text-center mt-3">
                            <p>
                                ¿No tienes cuenta?
                                <a
                                    href="/register"
                                    className="text-green-500 font-semibold ml-1 hover:underline">
                                    Registrate
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}
