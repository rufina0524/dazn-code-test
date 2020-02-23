import React from 'react';

import Tile from '../Tile/Tile';
import createNextRailState from './createNextRailState';

import styles from './rail.css';

class Rail extends React.Component {
    movedListeners = [];
    handleButtonLeftClick = this.handleButtonLeftClick.bind(this);
    handleButtonRightClick = this.handleButtonRightClick.bind(this);
    handleResize = this.handleResize.bind(this);
    handleTransitionEnd = this.handleTransitionEnd.bind(this);
    setTrackElementReference = this.setTrackElementReference.bind(this);
    setMovedListener = this.setMovedListener.bind(this);

    constructor(props) {
        super();

        this.state = createNextRailState({
            tileCount: props.tiles.length
        });
    }

    setState(nextState) {
        super.setState(createNextRailState(this.state, nextState));
    }

    componentDidMount() {
        this.updateDimensions();

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    setTrackElementReference(trackElement) {
        this.trackElement = trackElement;
    }

    setMovedListener(listener) {
        this.movedListeners.push(listener);
    }

    updateDimensions() {
        const trackPadding = parseInt(
            window.getComputedStyle(this.trackElement).paddingLeft
        );

        const tileWidths = Array.from(this.trackElement.children).map(
            tileElement => {
                const tileElementStyles = window.getComputedStyle(tileElement);

                return (
                    parseInt(tileElementStyles.width) +
                    parseInt(tileElementStyles.marginRight)
                );
            }
        );

        this.setState({
            tileWidths,
            trackPadding,
            viewportWidth: window.innerWidth
        });
    }

    getRailTrackStyle() {
        return {
            transform: `translateX(${this.state.trackX}px)`
        };
    }

    handleResize() {
        this.updateDimensions();
    }

    handleButtonLeftClick() {
        this.setState({
            index: Math.max(0, this.state.prevIndex)
        });
    }

    handleButtonRightClick() {
        this.setState({
            index: Math.min(this.state.nextIndex, this.state.tileCount - 1)
        });
    }

    handleTransitionEnd({ propertyName, target }) {
        if (target !== this.trackElement || propertyName !== 'transform') {
            return;
        }

        this.movedListeners.forEach(listener => listener());
    }

    handleLinkClick = e => {
        const { target } = e;
        const { onClick = () => {} } = this.props;
        const link = target.matches('a') ? target : target.closest('a');

        if (!link) return;

        if (onClick) {
            onClick();
        }

        e.preventDefault();

        const { href } = link;
        const segments = new URL(href).pathname.substring(1).split('/');
        const activeTileId = segments[1];

        this.setState({
            activeTileId
        });
    };

    render() {
        const railClassName = [
            styles.rail,
            this.state.isAtLeftEdge && styles.railAtLeftEdge,
            this.state.isAtRightEdge && styles.railAtRightEdge
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div className={railClassName} onClick={this.handleLinkClick}>
                <h2 className={styles.railHeading}>{this.props.title}</h2>
                <div
                    className={styles.railTrack}
                    ref={this.setTrackElementReference}
                    style={this.getRailTrackStyle()}
                    onTransitionEnd={this.handleTransitionEnd}
                >
                    {this.props.tiles.map(tile => (
                        <Tile
                            ref={this.setTileReference}
                            {...tile}
                            isActive={
                                this.state.activeTileId === tile.id &&
                                this.props.isActive
                            }
                            railId={this.props.id}
                            key={tile.id}
                            setMovedListener={this.setMovedListener}
                        />
                    ))}
                </div>
                <button
                    className={styles.railButtonLeft}
                    onClick={this.handleButtonLeftClick}
                />
                <button
                    className={styles.railButtonRight}
                    onClick={this.handleButtonRightClick}
                />
            </div>
        );
    }
}

export default Rail;
