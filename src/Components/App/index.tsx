import React from 'react';
import LoginBtn from "../LoginBtn";
import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Skeleton } from '@material-ui/lab';

class App extends React.Component {

    handleTelegramResponse = (response: any) => {
        console.log(response);
        alert('Logged in as ');

    };

    render() {
        const loading = true;
        return <Grid style={{padding: '20px'}} container spacing={6} justify="space-between" alignItems="center">
            <Grid item xs={6}>
                <CardHeader
                    avatar={
                        loading ? (
                            <Skeleton variant="circle" width={40} height={40}/>
                        ) : (
                            <Avatar
                                alt="Ted talk"
                                src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                            />
                        )
                    }
                    title={loading ? <Skeleton height={6} width="80%"/> : 'Ted'}
                    subheader={loading ? <Skeleton height={6} width="40%"/> : '5 hours ago'}
                />
            </Grid>
            <Grid item xs={6}>
                <LoginBtn botName={'HotWagerBot'} onLogin={this.handleTelegramResponse} usePic/>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Event 1
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" color="primary">
                            Choose event
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Event 2
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" color="primary">
                            Choose event
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>;
    }

}

export default App;
