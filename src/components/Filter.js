import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count+' '}Products</div>
        <div className="filter-sort">Sort:{' '}
          <select className="select" value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Latest</option>
            <option value="LOWEST">Price Ascending</option>
            <option value="HIGHEST">Price Descending</option>
          </select>
        </div>
        <div className="filter-size">Filter:{' '}
          <select className="select" value={this.props.price} onChange={this.props.filterProducts}>
            <option value="">All</option>
            <option value="200">Under $200</option>
            <option value="500">$200 to $500</option>
            <option value="501">Over $500</option>
          </select>
        </div>
      </div>
    )
  }
}
