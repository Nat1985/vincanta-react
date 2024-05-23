import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/buttons";

const PasswordReset = () => {
    return (
        <div className="flex w-full h-screen justify-center">
            <div className="mt-32 h-fit w-full md:w-[800px] flex flex-col gap-8 md:border-2 md:border-[#782a76] bg-white bg-opacity-90 p-8 rounded-xl">
                <h3>Reimposta la password</h3>
                <div className="flex flex-col">
                    <label htmlFor="email">Inserisci la tua email</label>
                    <input type="text" />
                </div>
                <Link><p className="text-[#782a76] text-lg">Ti verrà inviato un link per impostare una nuova password</p></Link>
                <div><PrimaryButton text="Mandami l'email" /></div>
            </div>
        </div>
    )
}

export default PasswordReset;