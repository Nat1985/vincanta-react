import { useEffect } from "react"

const Labels = ({ setIsLabel, frontLabel, backLabel }) => {
    useEffect(() => {
        if (!frontLabel && !backLabel) {
            setIsLabel(false)
        }
    }, [frontLabel, backLabel])
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden")
    }, []);
    return (
        <div className="bg-black bg-opacity-90 fixed inset-0 text-white flex flex-col items-center justify-center gap-8">
            {<div className="absolute top-4 right-4 text-4xl cursor-pointer" onClick={() => setIsLabel(false)}><i className="fi fi-sr-circle-xmark"></i></div>}
            {frontLabel && <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">Etichetta frontale</div>
                <img src={frontLabel.secure_url} alt="Etichetta fronte"  className="max-w-[500px] max-h-[500px]"/>
            </div>}
            {backLabel && <div className="flex flex-col gap-2 items-center">
                <div className="text-sm">Etichetta posteriore</div>
                <img src={backLabel.secure_url} alt="Etichetta retro" className="max-w-[500px] max-h-[500px]" />
            </div>}
        </div>
    )
}

export default Labels