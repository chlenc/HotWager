import React from 'react';
import {Box} from 'grommet'
import styles from './styles.scss'

const App: React.FC = () => {
    return (
        <Box
            className={styles.root}
            direction="row"
            border={{ color: 'brand', size: 'large' }}
            pad="medium"
        >
            <Box pad="small" background="dark-3" />
            <Box pad="medium" background="light-3" />
        </Box>
    );
}

export default App;
