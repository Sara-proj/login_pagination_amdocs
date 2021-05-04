import React from 'react';
import PropTypes from 'prop-types';
import { paginateService } from './paginate.service';
import './pagination.scss';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    maxPages: PropTypes.number,
    labels: PropTypes.object,
    styles: PropTypes.object,
    disableDefaultStyles: PropTypes.bool
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10,
    maxPages: 10,
    labels: {
        first: 'First',
        last: 'Last',
        previous: 'Previous',
        next: 'Next'
    }
}

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pager: {} };
        this.styles = {};

        if (!props.disableDefaultStyles) {
            this.styles = {
                ul: {
                    margin: 0,
                    padding: 0,
                    display: 'inline-block'
                },
                li: {
                    listStyle: 'none',
                    display: 'inline',
                    textAlign: 'center'
                },
                a: {
                    cursor: 'pointer',
                    padding: '6px 12px',
                    display: 'block',
                    float: 'left',
                    border: "solid black 2px"
                }
            }
        }

        // merge custom styles with default styles
        if (props.styles) {
            this.styles = {
                ul: { ...this.styles.ul, ...props.styles.ul },
                li: { ...this.styles.li, ...props.styles.li },
                a: { ...this.styles.a, ...props.styles.a }
            };
        }
        this.changePageSize = this.changePageSize.bind(this);
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    changePageSize(event) {
        var pager = this.state.pager;
        this.setState({ pager: { ...pager, pageSize: +event.target.value } }, () => {
            this.setPage(pager.currentPage);
        });
    }

    setPage(page) {
        var { items, maxPages } = this.props;
        var pager = this.state.pager;
        var pageSize = pager.pageSize || this.props.pageSize;
        // get new pager object for specified page
        pager = paginateService.paginate(items.length, page, pageSize, maxPages);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage({ ...pager, items: pageOfItems });
    }

    render() {
        var pager = this.state.pager;
        var labels = this.props.labels;
        var styles = this.styles;
        var pageSize = pager.pageSize;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <>
                <div className="row">
                    <div className="col-8">
                        <ul className="pagination col-8"  >
                            <li className={`nav page-item first ${pager.currentPage === 1 ? 'disabled' : ''}`} style={styles.li}>
                                <a className="page-link" onClick={() => this.setPage(1)} style={styles.a}>{labels.first}</a>
                            </li>
                            <li className={`nav page-item previous ${pager.currentPage === 1 ? 'disabled' : ''}`} style={styles.li}>
                                <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)} style={styles.a}>{labels.previous}</a>
                            </li>
                            {pager.pages.map((page, index) =>
                                <li key={index} className={`page-item page-number ${pager.currentPage === page ? 'active' : ''}`} style={styles.li}>
                                    <a className="page-link" onClick={() => this.setPage(page)} style={styles.a}>{page}</a>
                                </li>
                            )}
                            <li className={`nav page-item next ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} style={styles.li}>
                                <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)} style={styles.a}>{labels.next}</a>
                            </li>
                            <li className={`nav page-item last ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} style={styles.li}>
                                <a className="page-link" onClick={() => this.setPage(pager.totalPages)} style={styles.a}>{labels.last}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <input type="number" value={pageSize} max={this.props.settings.max} step={this.props.settings.step} min={this.props.settings.min} onChange={this.changePageSize} />
                        <label> per page </label>
                    </div>
                    <div className="col-2 info">
                        <label>{pager.currentPage} / {pager.totalPages}</label>
                    </div>
                </div>
            </>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
