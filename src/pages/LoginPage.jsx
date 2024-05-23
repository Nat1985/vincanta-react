import { PrimaryButton } from '../components/buttons.jsx';

const LoginPage = () => {
    return (
        <div className="flex w-full h-screen justify-center">
            <div className="mt-32 h-fit flex flex-col gap-8 border-2 border-[#782a76] bg-white bg-opacity-90 p-8 rounded-xl">
                <h2>Esegui il login</h2>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input type="password" />
                </div>
                <PrimaryButton text="Accedi" />
            </div>
        </div>
    )
}

export default LoginPage;