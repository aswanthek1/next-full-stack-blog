"use client"

import styles from './tableButton.module.css'

const TableButton = ({id, handleButtonClicked=()=>null}:any) => {
    return (
        <button onClick={() => handleButtonClicked(id)} className={styles.postButton}>Delete</button>
    )
}

export default TableButton;