const Filter = ({ changeFilter, filter, handleFilterChange }) => {
  return (
    <form onSubmit={changeFilter}>
      <div>
        find countries<input type="search" value={filter} onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

export default Filter