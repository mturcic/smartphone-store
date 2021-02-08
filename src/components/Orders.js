import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../actions/orderActions";
import {} from "react-table";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import formatCurrency from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    dispatch(fetchOrders(page, limit));
  }, [dispatch, page, limit]);

  return !orders ? (
    <div>Loading Orders</div>
  ) : (
    <div className="orders">
      <div className="frame">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADDRESS</th>
              <th>ITEMS</th>
            </tr>
          </thead>
          <tbody>
            {orders.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td> {formatCurrency(order.total)}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>
                  {order.cartItems.map((item) => (
                    <div key={item._id}>
                      {item.count} {" x "} {item.title}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button
          className="button-paginate"
          disabled={orders.currentPage <= 1}
          onClick={previousPage}
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </button>
        <div className="pagination-display">
          &nbsp;{orders.currentPage}&nbsp;of&nbsp;{orders.totalPages}
        </div>
        <button
          className="button-paginate"
          disabled={orders.currentPage >= orders.totalPages}
          onClick={nextPage}
        >
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </button>
      </div>
    </div>
  );
};
// class Orders extends Component {
//   componentDidMount() {
//     this.props.fetchOrders(10, 1);
//   }
//   render() {
//     const { orders } = this.props;
//     return !orders ? (
//       <div>Orders</div>
//     ) : (
//       <div className="orders" key={orders._id}>
//         <div className="frame">
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>DATE</th>
//                 <th>TOTAL</th>
//                 <th>NAME</th>
//                 <th>EMAIL</th>
//                 <th>ADDRESS</th>
//                 <th>ITEMS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr>
//                   <td>{order._id}</td>
//                   <td>{order.createdAt}</td>
//                   <td> {formatCurrency(order.total)}</td>
//                   <td>{order.name}</td>
//                   <td>{order.email}</td>
//                   <td>{order.address}</td>
//                   <td>
//                     {order.cartItems.map((item) => (
//                       <div>
//                         {item.count} {" x "} {item.title}
//                       </div>
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(
//   (state) => ({
//     orders: state.order.orders,
//   }),
//   {
//     fetchOrders,
//   }
// )(Orders);
