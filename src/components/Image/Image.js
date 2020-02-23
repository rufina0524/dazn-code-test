import React from 'react';

import { IMAGE_PATH } from '../../shared/constants/config';

import styles from './image.css';

class Image extends React.Component {
    handleLoad = this.handleLoad.bind(this);
    checkVisibility = this.checkVisibility.bind(this);
    setImageElementReference = this.setImageElementReference.bind(this);

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isVisible: false,
            url: `${IMAGE_PATH}${props.id}.jpg`
        };

        props.setMovedListener(this.checkVisibility);
    }

    componentDidMount() {
        this.checkVisibility();

        window.addEventListener('resize', this.checkVisibility);
        window.addEventListener('scroll', this.checkVisibility);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkVisibility);
        window.removeEventListener('scroll', this.checkVisibility);
    }

    checkVisibility() {
        if (this.state.isVisible) return;

        const { innerHeight } = window;
        const {
            top,
            left,
            bottom,
            right
        } = this.imageElement.getBoundingClientRect();

        if (
            top <= innerHeight &&
            bottom >= 0 &&
            left <= innerHeight &&
            right >= 0
        ) {
            this.setState({
                isVisible: true
            });
        }
    }

    handleLoad() {
        requestAnimationFrame(() => {
            this.setState({
                isLoaded: true
            });
        });
    }

    getImageBackgroundStyle() {
        return {
            backgroundImage: `url(${this.state.url})`
        };
    }

    setImageElementReference(imageElement) {
        this.imageElement = imageElement;
    }

    render() {
        const { alt, className } = this.props;

        const imageClassName = [
            styles.image,
            this.state.isLoaded && styles.imageLoaded,
            className && className
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div className={imageClassName} ref={this.setImageElementReference}>
                {this.state.isVisible && (
                    <img
                        className={styles.imageImg}
                        src={this.state.url}
                        alt={alt}
                        onLoad={this.handleLoad}
                    />
                )}
                <div
                    className={styles.imageBackground}
                    style={
                        this.state.isLoaded
                            ? this.getImageBackgroundStyle()
                            : null
                    }
                />
            </div>
        );
    }
}

export default Image;
