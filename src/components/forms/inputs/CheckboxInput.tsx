import styles from './CheckboxInput.module.scss';

interface CheckboxInputProps {
  checked: boolean | undefined;
  onChange: () => void | null;
  labelText: string;
  id: string;
}

export default function CheckboxInput({ labelText, id, checked, onChange }: CheckboxInputProps) {
  return (
    <label className={`${styles.label}`} htmlFor={id}>
      {labelText}
      <input className={`${styles.checkbox}`} id={id} type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
}
