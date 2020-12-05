import React from 'react';

export default class Input extends React.Component {
    componentDidUpate(prevProps) {
        console.log(prevProps, this.props)

        console.log(prevProps.meta.active, this.props.meta.active)
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }
    
    render() {
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = (
                <div className="form-error">{this.props.meta.error}</div>
            );
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <input
                    {...this.props.input}
                    id={this.props.nickName}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                />
            </div>
        );
    }
}