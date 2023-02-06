const Filter = ({ newFilter, changeFilter, handleFilterChange }) => {
    return (
      <form onSubmit={changeFilter}>
        <div>
          filter shown with <input value={newFilter} onChange={handleFilterChange} />
          {/* <button type="submit" hidden></button> */}
        </div>
      </form>
    )
  }

export default Filter