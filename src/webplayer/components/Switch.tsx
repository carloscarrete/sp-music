interface Props {
    isOn: boolean;
    onToggle: (value: boolean) => void;
}

export const Switch = ({ isOn, onToggle }: Props) => {
    return (
        <div
            className={`flex items-center cursor-pointer w-12 h-6 rounded-full ${isOn ? "bg-green-500" : "bg-gray-400"
                }`}
            onClick={() => onToggle(!isOn)}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isOn ? "translate-x-6" : "translate-x-0"
                    }`}
            ></div>
        </div>)
}
