import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { collapseSidebar, expandSidebar } from '../../redux/actions/sidebar.actions';

import routes from '../../constants/routes';
import './sidebar.scss';

const Sidebar = (props) => {
	const { sidebar } = props;
	const { sidebarCollapsed } = sidebar;

	const handleToggleSidebar = () => {
		if (sidebarCollapsed) {
			props.expandSidebar();
		} else {
			props.collapseSidebar();
		}
	};
	
	return (
		<aside className={`sidebar ${sidebarCollapsed ? 'sidebar--collapsed' : ''}`}>
			<div className="sidebar__header">
				<h1>💰{sidebarCollapsed ? '' : 'SYMA'}</h1>

				<div
					className={`sidebar__toggler ${sidebarCollapsed ? 'sidebar__toggler--expand' : ''}`}
					title="Collapse"
					onClick={handleToggleSidebar}
				/>
			</div>
			
			<div className="sidebar__add">
				<Button variant="primary">{sidebarCollapsed ? '+' : 'Add transaction'}</Button>
			</div>

			<ul className="sidebar__menu">
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.HOME}
						className="sidebar__link sidebar__link--dashboard"
						activeClassName="sidebar__link--active"
					>
						{sidebarCollapsed ? '' : 'Dashboard'}
					</NavLink>
				</li>
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.CALENDAR}
						className="sidebar__link sidebar__link--calendar"
						activeClassName="sidebar__link--active"
					>
						{sidebarCollapsed ? '' : 'Calendar'}
					</NavLink>
				</li>
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.TRANSACTIONS}
						className="sidebar__link sidebar__link--transactions"
						activeClassName="sidebar__link--active"
					>
						{sidebarCollapsed ? '' : 'Transactions'}
					</NavLink>
				</li>
				<li className="sidebar__menu-item">
					<NavLink
						to={routes.CATEGORIES}
						className="sidebar__link sidebar__link--categories"
						activeClassName="sidebar__link--active"
					>
						{sidebarCollapsed ? '' : 'Categories'}
					</NavLink>
				</li>
			</ul>

			{/* transactions by category/tag */}
		</aside>
	);
};

Sidebar.propTypes = {
	sidebar: PropTypes.shape({
		sidebarCollapsed: PropTypes.bool.isRequired,
	}),
	collapseSidebar: PropTypes.func.isRequired,
	expandSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	sidebar: state.sidebar,
});

export default connect(mapStateToProps, { collapseSidebar, expandSidebar })(Sidebar);
