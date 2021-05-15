// import React from 'react'

// const EntFilter = () => {
//      const [Checked, setChecked] = useState([]);

//      const handleToggle = (value) => {
//        const currentIndex = Checked.indexOf(value);
//        const newChecked = [...Checked];

//        if (currentIndex === -1) {
//          newChecked.push(value);
//        } else {
//          newChecked.splice(currentIndex, 1);
//        }

//        setChecked(newChecked);
//        props.handleFilters(newChecked);
//        //update this checked information into Parent Component
//      };

//      const renderCheckboxLists = () =>
//        props.list &&
//        props.list.map((value, index) => (
//          <React.Fragment key={index}>
//            <Checkbox
//              onChange={() => handleToggle(value._id)}
//              type="checkbox"
//              checked={Checked.indexOf(value._id) === -1 ? false : true}
//            />
//            &nbsp;&nbsp;
//            <span>{value.name}</span>
//            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//          </React.Fragment>
//        ));

//      return (
//        <div>
//          <Collapse defaultActiveKey={["0"]}>
//            <Panel header="Continents" key="1">
//              {renderCheckboxLists()}
//            </Panel>
//          </Collapse>
//        </div>
//      );
// }

// export default EntFilter

import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts.length} Products
        </div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
