import styles from './Input.module.scss';

interface Proptypes {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
}

const Input = (props: Proptypes) => {
  const { label, name, type, placeholder } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={label}>{label}</label>}
      <input id={name} name={name} type={type} className={styles.container__input} placeholder={placeholder} />
    </div>
  );
};

export default Input;
