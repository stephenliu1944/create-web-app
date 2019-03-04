import styles from './component1.scss';
import React, { Component } from 'react';

/**
 * Demo for test
 */
export default class Component1 extends Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({ isChecked: !this.state.isChecked });
    }

    render() {
        return (
            <label className={styles.component1}>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
            </label>
        );
    }
}