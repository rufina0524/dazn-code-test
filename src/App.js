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

    handleLinkClick = this.handleLinkClick.bind(this);

    async componentDidMount() {
        let railsData;

        window.addEventListener('click', this.handleLinkClick);

        try {
            railsData = await railsService.get();
        } catch (err) {
            console.error(err);
        }

        this.setState({
            rails: railsData,
            isLoading: false
        });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleLinkClick);
    }

    handleLinkClick(e) {
        const { target } = e;
        const link = target.matches('a') ? target : target.closest('a');

        if (!link) return;

        e.preventDefault();

        const { href } = link;
        const segments = new URL(href).pathname.substring(1).split('/');
        const activeId = segments[1];

        this.setActiveTile(activeId);
    }

    setActiveTile(activeId) {
        const nextRails = this.state.rails.map(rail => {
            const nextRail = Object.assign({}, rail);

            nextRail.tiles = nextRail.tiles.map(tile =>
                Object.assign({}, tile, {
                    isActive: tile.id === activeId
                })
            );

            return nextRail;
        });

        this.setState({
            rails: nextRails
        });
    }

    render() {
        return (
            <>
                <Header />
                <main className={styles.appMain}>
                    {this.state.rails.map(rail => (
                        <Rail {...rail} key={rail.id} />
                    ))}
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
