import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import routes from '../../constants/routes';
import './sidebar.scss';

const Sidebar = () => {
	return (
		<aside className="sidebar">
			<div className="sidebar__header">
				<h1>💰SYMA</h1>

				<div
					className="sidebar__toggler"
					title="Collapse"
				/>
			</div>
			
			<div className="sidebar__add">
				<Button variant="primary">Add transaction</Button>
			</div>

			<ul className="sidebar__menu">
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.HOME}
						className="sidebar__link sidebar__link--dashboard"
						activeClassName="sidebar__link--active"
					>
						Dashboard
					</NavLink>
				</li>
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.CALENDAR}
						className="sidebar__link sidebar__link--calendar"
						activeClassName="sidebar__link--active"
					>
						Calendar
					</NavLink>
				</li>
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.TRANSACTIONS}
						className="sidebar__link sidebar__link--transactions"
						activeClassName="sidebar__link--active"
					>
						Transactions
					</NavLink>
				</li>
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.CATEGORIES}
						className="sidebar__link sidebar__link--categories"
						activeClassName="sidebar__link--active"
					>
						Categories
					</NavLink>
				</li>
			</ul>

			{/* transactions by category/tag */}
		</aside>
	);
};

export default Sidebar;
