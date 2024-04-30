import styles from './Select.module.scss';

type Option = {
  value: string;
  label: string;
};

interface Proptypes {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
}
const Select = (props: Proptypes) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} className={styles.container__select} defaultValue={defaultValue} disabled={disabled}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
