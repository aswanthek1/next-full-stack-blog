import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>aswanth</div>
      <div className={styles.text}>
        aswanth's creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;