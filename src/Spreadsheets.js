import React from 'react';

class Spreadsheets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderSheets = () => {
        return (
            <div></div>
        )
    }

    render() {
        return this.renderSheets()
    }

}

export default Spreadsheets;
