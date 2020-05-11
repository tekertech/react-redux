import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";
import { ListGroupItem, ListGroup, Badge } from "reactstrap";

class CategoryList extends Component {
  componentDidMount() {
    debugger;
    this.props.actions.getCategories();
  }

  selectedCategory = (category) => {
    debugger;
    this.props.actions.changeCategory(category.categoryName);
    this.props.actions.getProducts(category.id);
  };

  render() { 
    debugger;
    return (
      <div>
        <h3>
          <Badge color="warning">Categories</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.categoryName === this.props.currentCategory}
              onClick={() => this.selectedCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  debugger;
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  debugger;
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProductList, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
