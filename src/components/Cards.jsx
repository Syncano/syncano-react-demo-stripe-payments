
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteCard } from '../actions/cardActions';


const TableHead = data => (
  <thead className="thead-default">
    <tr>
      {data.data.map(head => (
        <th key={head}>{head}</th>
      ))}
    </tr>
  </thead>
);

TableHead.propTypes = {
  data: PropTypes.array
};

const TableRow = prop => (
  <tr>
      <td className = 'two_chars'>{prop.data.cardID}</td>
      <td>{prop.data.brand}</td>
      <td>{prop.data.last4}</td>
      <td>{prop.data.exp_month}</td>
      <td>{prop.data.exp_year}
          <span className='delete'>
            <i
                className='fa fa-times-circle'
                onClick={() => {
                    prop.onDelete(deleteCard(prop.customerID, prop.data.cardID));
                }}
             />
          </span>
      </td>
  </tr>
);
/**
 * PaymentSuccess component
 * @class PaymentSuccess
 * @extends {React.Component}
 * @render {render()}
 */
class Cards extends React.Component {
  /**
       * Renders component
       * @return {XML} JSX
       */
  render() {
    const rows = this.props.card.data.map((cardDetails) => {
      return (
            <TableRow
                data={cardDetails}
                key={cardDetails.cardID}
                onDelete={this.props.dispatch}
                customerID={this.props.customerID}
            />
      );
    });
    return (
      <div className="container">
      <div className='row'>
          <div className='col-sm-10'>
            <div className='panel panel-default credit-card-box'>
              {this.props.card.data.length ?
                <table className="table table-striped">
                    <TableHead data={Object.keys(this.props.card.data[0])} />
                    <tbody>{rows}</tbody>
                </table>
                :
                ''
            }
          </div>
        </div>
       </div>
      </div>
    );
  }
}

Cards.propTypes = {
  card: PropTypes.object,
  customerID: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    card: state.cardReducer,
    customerID: state.customerReducer.customerId
  };
};

export default connect(mapStateToProps)(Cards);
