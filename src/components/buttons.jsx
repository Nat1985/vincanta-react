export const PrimaryButton = ({ text, click }) => {
    return (
        <button className="self-center bg-[#782a76] text-white" onClick={click}>{text}</button>
    )
}
export const SecondaryButton = ({ text, click }) => {
    return (
        <button className="self-center bg-[white] border-2 border-[#782a76] text-[#782a76]" onClick={click}>{text}</button>
    )
}
export const GreenButton = ({ text, click }) => {
    return (
        <button className="self-center bg-green-400 text-white" onClick={click}>{text}</button>
    )
}
export const DangerButton = ({ text, click }) => {
    return (
        <button className="self-center bg-red-400 text-white" onClick={click}>{text}</button>
    )
}
