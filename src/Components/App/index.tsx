import React from 'react';
import LoginBtn, { IUser } from "../LoginBtn";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Skeleton } from '@material-ui/lab';
import { AccountsStore, DappStore } from "../../stores";
import { inject, observer } from 'mobx-react';

interface IInjectedProps {
    accountsStore?: AccountsStore
    dappStore?: DappStore
}

@inject('accountsStore', 'dappStore')
@observer
class App extends React.Component<IInjectedProps> {

    handleTelegramResponse = (response: any) => {
        console.log(this.props.accountsStore!.updateUser(response).address);
    };

    render() {
        const user = this.props.accountsStore!.user;
        const {k1, k2, story, chooseEvent, withdraw, load} = this.props.dappStore!;
        return <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '20px'}}  container spacing={6} justify="space-between" alignItems="center">
            <Grid item xs={6}>
                <CardHeader
                    avatar={!user
                        ? <Skeleton variant="circle" width={40} height={40}/>
                        : <Avatar alt="Ted talk" src={user.photo_url}/>}
                    subheader={!user ? <Skeleton height={6} width="40%"/> : user.address}
                    title={!user ? <Skeleton height={6} width="80%"/> :
                        <div>balance:&nbsp;{user.balance}&nbsp;waves</div>}
                />
            </Grid>
            <Grid item xs={6}>
                <LoginBtn botName={'HotWagerBot'} onLogin={this.handleTelegramResponse} usePic/>
            </Grid>
            <Grid item xs={6} >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <EventCard title={'Event 1'} k={k1/100} user={user} chooseEvent={chooseEvent} load={load}/>
                    <EventCard title={'Event 2'} k={k2/100} user={user} chooseEvent={chooseEvent} load={load}/>
                </div>
                <div style={{display: 'flex', marginTop: '50px', justifyContent: "center"}}>
                    <Button
                        disabled={load || !user || !user.seed}
                        onClick={() => withdraw(user!.seed || '')} variant="contained" color="secondary">
                        Withdraw
                    </Button>
                </div>
            </Grid>
            {story && <Grid item xs={6}>
                <Table aria-label="simple table" style={{width: 'unset'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Index</TableCell>
                            <TableCell align="right">Coefficient 1</TableCell>
                            <TableCell align="right">Coefficient 2</TableCell>
                            <TableCell>Your choose</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {story.map(({k1, k2, i, e}) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">{i}</TableCell>
                                <TableCell align="right">{k1 / 100}</TableCell>
                                <TableCell align="right">{k2 / 100}</TableCell>
                                <TableCell align="right">{e}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>}
        </Grid>;
    }

}

interface IEventCardProps {
    title: string,
    k: number | null,
    user: IUser | null,
    chooseEvent: (n: number, s: string) => void
    load: boolean
}

class EventCard extends React.Component<IEventCardProps> {

    render() {
        const {title, k, user, chooseEvent, load} = this.props;
        return <Card
            style={{width: '250px', margin: '20px'}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                        {k && k / 100}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    disabled={load || !user || !user.seed}
                    onClick={() => chooseEvent(1, user!.seed || '')} variant="contained" color="primary">
                    Choose event
                </Button>
            </CardActions>
        </Card>;
    }
}

export default App;
