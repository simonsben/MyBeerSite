import React, { Component } from 'react';
import Header from './components/header'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Top10 from './pages/top_10';
import Container from 'react-bootstrap/Container';
import { get_beers } from './actions/get_data';
import AllBeers from './pages/all_beers';
import OnSale from './pages/on_sale';
import Kegs from './pages/kegs';
import Home from './pages/home';
import Beer from './pages/beer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: []
        }

        this.update_beer = this.update_beer.bind(this);
    }
    
    componentDidMount() {
        get_beers()
            .then(this.update_beer);
    }

    update_beer = beers => {
        if (!beers) beers = [];

        if (beers.length !== this.state.beers.length)
            this.setState(state => ({ ...state, beers }))
    }

    render() {
        const { beers } = this.state;

        return (
            <div className='body'>
                <Router>
                    <Header />
    
                    <Container>
                        <Switch>
                            <Route path="/top_10">
                                <Top10 beers={ beers } />
                            </Route>

                            <Route path="/all_beers">
                                <AllBeers beers={ beers } />
                            </Route>

                            <Route path='/on_sale'>
                                <OnSale beers={ beers } />
                            </Route>

                            <Route path='/kegs'>
                                <Kegs beers={ beers } />
                            </Route>

                            <Route 
                                path='/beers/:beer_name' 
                                render={router_props => <Beer { ...router_props } beers={ beers } />}/>

                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Container>
                </Router>
            </div>
        );
    }
}

export default App;
