import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import Layout from '../Layout/Layout';
import { API_BASE_URI } from '../../constants/uri';

class UserSettings extends Component {
    state = {
        advanced_date: 0,
        curr_balance: 0,
        day_limit: 0,
        isSavedThisMonth: 0,
        paydate: 1,
        savings_percent: 0,
        total_income: 0,
        total_required_expenses: 0,
        isLoading: true,
        error: null,
    };

    componentDidMount() {
        axios.get(`${API_BASE_URI}/userSettings/`)
            .then((response) => {
                const { userSettings } = response.data;
                this.setState({
                    ...userSettings,
                    isLoading: false,
                    error: null,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.response.data.msg,
                });
            });
    }

    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    handleFormSubmit = async e => {
        e.preventDefault();
        const {
            savings_percent, paydate, advanced_date, curr_balance, isSavedThisMonth,
        } = this.state;

        axios.patch(`${API_BASE_URI}/userSettings`, {
            advance_date: advanced_date,
            savings_percent,
            paydate,
            curr_balance,
            isSavedThisMonth,
        })
            .then((response) => {
                const { updatedUserSettings } = response.data;
                this.setState({
                    ...updatedUserSettings,
                    isLoading: false,
                    error: null,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.response.data.msg,
                });
            });
    };

    render() {
        const {
            advanced_date,
            curr_balance,
            day_limit,
            isSavedThisMonth,
            paydate,
            savings_percent,
            total_income,
            total_required_expenses,
            isLoading,
        } = this.state;

        if (isLoading) return (
            <Layout contentClassName="user-settings">
                <h3>Loading...</h3>
            </Layout>
        );

        return (
            <Layout contentClassName="user-settings">
                <h1>User settings</h1>
    
                <Form className="mb-5" onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="curr_balance">Current Balance:</Form.Label>
                        <Form.Control
                            type="text"
                            name="curr_balance"
                            id="curr_balance"
                            placeholder="0"
                            value={curr_balance}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="advanced_date">Advance Date:</Form.Label>
                        <Form.Control
                            type="text"
                            name="advanced_date"
                            id="advanced_date"
                            placeholder="Date"
                            value={advanced_date}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="paydate">Paydate:</Form.Label>
                        <Form.Control
                            type="text"
                            name="paydate"
                            id="paydate"
                            placeholder="Date"
                            value={paydate}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="savings_percent">Savings percent:</Form.Label>
                        <Form.Control
                            type="text"
                            name="savings_percent"
                            id="savings_percent"
                            placeholder="30%"
                            value={savings_percent}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="total_income">Total income:</Form.Label>
                        <Form.Control
                            type="text"
                            name="total_income"
                            id="total_income"
                            placeholder="0"
                            value={total_income}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="total_required_expenses">Total required expenses:</Form.Label>
                        <Form.Control
                            type="text"
                            name="total_required_expenses"
                            id="total_required_expenses"
                            placeholder="0"
                            value={total_required_expenses}
                            onChange={this.handleInputChange}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Saved this month"
                            name="isSavedThisMonth"
                            checked={isSavedThisMonth}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label htmlFor="total_required_expenses">Your day limit:</Form.Label>
                        <Form.Control
                            type="text"
                            name="day_limit"
                            id="day_limit"
                            value={Math.round(day_limit)}
                            onChange={this.handleInputChange}
                            disabled
                        />
                    </Form.Group>
    
                    <Button variant="primary" onClick={this.handleFormSubmit}>Save</Button>
                </Form>
            </Layout>
        );
    }
}

export default UserSettings;
