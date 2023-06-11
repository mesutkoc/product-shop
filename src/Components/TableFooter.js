import './table.scss';
function TableFooter({ totalResults, pageCount, data }) {
    return (
        <div className="resultFooter">
            {totalResults > 0 && <span>{`Total result: ${totalResults}`}</span>}
        </div>);
}

export default TableFooter;