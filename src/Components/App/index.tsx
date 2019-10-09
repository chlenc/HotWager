import React from 'react';
import { Box } from 'grommet'
import styles from './styles.scss'
import LoginBtn from "../LoginBtn";


class App extends React.Component {

    handleTelegramResponse = (response: any) => {
        console.log(response);
        alert('Logged in as ');

    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Box
                className={styles.root}
                direction="row"
                border={{color: 'brand', size: 'large'}}
                pad="medium"
            >
                <div className={styles.header}>
                    <LoginBtn botName={'HotWagerBot'} onLogin={this.handleTelegramResponse} usePic/>
                </div>
                <div className={styles.events}></div>
            </Box>
        );
    }

}

export default App;
