import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../components/Layout/Layout';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { API_BASE_URI } from '../../constants/uri';

const Transactions = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { authState } = props;

    useEffect(() => {
        if (!authState.authUser) props.history.push('/auth');
        
        const getTransactions = async () => {
            const requestBody = {
                query: `
                    query {
                        transactions {
                            _id
                            category_id {
                                name
                            }
                            type
                            description
                            amount
                            datetime
                        }
                    }
                `,
            };
    
            try {
                const { data } = await axios.post(API_BASE_URI, requestBody);
    
                if (data.errors) {
                    setIsLoading(false);
                    // dispatch(setGlobalError(error))
                } else {
                    const { transactions } = data.data;
    
                    setTransactions(transactions);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('err', err);
                // setGlobalError
            }
        };

        getTransactions();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Layout contentClassName="transactions">
            <LoadingOverlay show={isLoading} text="Loading..." />
            
            <h1>My transactions</h1>

            <ul className="transactions__list">
                {transactions && transactions.length > 0 && transactions.map(transaction => (
                    <li key={transaction._id}>
                        {transaction.description} - {transaction.amount} <br />
                        {transaction.category_id.name} - {new Date(+transaction.datetime).toLocaleString()}
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

const mapStateToProps = state => ({
    authState: state.auth,
});

export default withRouter(connect(mapStateToProps)(Transactions));
