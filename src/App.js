import React from 'react';

import Rail from './components/Rail/Rail';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import * as railsService from './services/rails';

import styles from './app.css';

class App extends React.PureComponent {
    state = {
        rails: [],
        isLoading: true
    };

    async componentDidMount() {
        let railsData;

        try {
            railsData = await railsService.get();
        } catch (err) {
            console.error(err);
        }

        this.setState({
            rails: railsData,
            isLoading: false,
            activeRailId: ''
        });
    }

    render() {
        return (
            <>
                <Header />
                <main className={styles.appMain}>
                    {this.state.rails.map(rail => (
                        <Rail
                            {...rail}
                            key={rail.id}
                            isActive={this.state.activeRailId === rail.id}
                            onClick={() => {
                                this.setState({
                                    activeRailId: rail.id
                                });
                            }}
                        />
                    ))}
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
