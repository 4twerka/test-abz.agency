import { Text } from "./Text";

interface Props {
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

function Checkbox({ value, name, checked, onChange }: Props) {
  return (
    <label className="flex items-center gap-3 cursor-pointer relative">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="peer sr-only"
      />
      <div className={`w-[20px] h-[20px] rounded-full border border-customGrey flex items-center justify-center ${checked ? 'border-[#00BDD3]' : ''}`}>
        <div className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ${checked ? 'bg-[#00BDD3]' : ''}`}></div>
      </div>
      <Text variant="label">{value}</Text>
    </label>
  );
}

export { Checkbox };