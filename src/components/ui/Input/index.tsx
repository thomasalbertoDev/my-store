import styles from './Input.module.scss';

interface Proptypes {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const Input = (props: Proptypes) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={label}>{label}</label>}
      <input id={name} name={name} type={type} className={styles.container__input} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} />
    </div>
  );
};

export default Input;
