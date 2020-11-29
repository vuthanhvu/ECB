import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../../../globalState";

function OrderHistory(props) {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    console.log(typeof history);

    return (
        <div>
            <h2>History</h2>
            <h4>You have {history.length} ordered</h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item) => (
                        <tr key={item._id}>
                            <td>{item.paymentID}</td>
                            <td>{item.createdAt}</td>
                            <td>
                                <Link to={`/history/${item._id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderHistory;
