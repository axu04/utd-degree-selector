//Contains the declaration of the HowToText component
//Last Edited: Alec Xu -- July 19

import React from 'react'
import styles from './HowToText.module.css'

function HowToText() {
        return <div className={styles.instructions}>
                Drag and drop available courses into selected courses to add them to your basket. Show and hide prerequisites and corequisites for each class by clicking on them.
        </div>
}

export default HowToText