const NumberInput = (props) => {
    const { className, value, onChange, name } = props;

    const increase = () => onChange(value + 1);
    const decrease = () => onChange((value > 1 ? value - 1 : 1));

    return (
        <div className={"flex items-center " + className} >
            <button
                onClick={decrease}
                type="button"
                className="px-3 w-[52px] cursor-pointer bg-(--Dark-Primary) text-white h-[48px] border-none outline-none shadow-none"
            >
                -
            </button>

            <input
                type="number"
                value={value}
                name={name}
                onChange={(e) => onChange(Number(e.target.value))}
                className="no-spinner w-full text-center border px-2 border-none outline-none shadow-none h-[48px] bg-[#152836]"
                min={1}
            />

            <button
                onClick={increase}
                type="button"
                className="px-3 w-[52px] cursor-pointer bg-(--Dark-Primary) text-white h-[48px]"
            >
                +
            </button>
        </div>
    );
}

export default NumberInput;