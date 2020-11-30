import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';

import { GlobalState } from "../../../globalState";


function OrderHistory(props) {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [isAdmin] = state.userAPI.isAdmin; 
    const [history, setHistory] = state.userAPI.history;

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get("/api/payment", {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                } else {
                    const res = await axios.get("/user/history", {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                }
            };
            getHistory();
        }
    }, [token, isAdmin, setHistory]);

    return (
        <div className="history-page">
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
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
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
