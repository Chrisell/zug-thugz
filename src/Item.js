import React from 'react';


class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item['Name']}</td>
                <td>{this.props.item['Location']}</td>
                <td>{this.props.item['Boss']}</td>
                <td>{this.props.item['Slot']}</td>
            </tr>
        )
    }
}

export default Item;