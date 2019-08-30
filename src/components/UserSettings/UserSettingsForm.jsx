import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const UserSettingsForm = ({ userSettings, onSubmitForm }) => {
    const initialState = {
        ...userSettings,
    };
    const [state, setState] = useState(initialState);
    const {
        advance_date,
        curr_balance,
        day_limit,
        isSavedThisMonth,
        paydate,
        savings_percent,
        total_income,
        total_required_expenses,
    } = state;
    
    const handleSubmitForm = (e) => {
        if (e) e.preventDefault();
        
        onSubmitForm(state);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    return (
        <Form className="mb-5" onSubmit={handleSubmitForm}>
            <Form.Group>
                <Form.Label htmlFor="curr_balance">Current Balance:</Form.Label>
                <Form.Control
                    type="text"
                    name="curr_balance"
                    id="curr_balance"
                    placeholder="0"
                    value={curr_balance}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="advanced_date">Advance Date:</Form.Label>
                <Form.Control
                    type="text"
                    name="advance_date"
                    id="advance_date"
                    placeholder="Date"
                    value={advance_date}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    disabled
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Saved this month"
                    name="isSavedThisMonth"
                    checked={isSavedThisMonth}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="total_required_expenses">Your day limit:</Form.Label>
                <Form.Control
                    type="text"
                    name="day_limit"
                    id="day_limit"
                    value={Math.round(day_limit)}
                    onChange={handleInputChange}
                    disabled
                />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmitForm}>Save</Button>
        </Form>
    );
};

UserSettingsForm.propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    userSettings: PropTypes.object,
};

UserSettingsForm.defaultPropTypes = {
    userSettings: {
        advance_date: 0,
        curr_balance: 0,
        day_limit: 0,
        isSavedThisMonth: 0,
        paydate: 1,
        savings_percent: 0,
        total_income: 0,
        total_required_expenses: 0,
    },
};

export default UserSettingsForm;
