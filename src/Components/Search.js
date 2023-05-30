import { useEffect, useRef } from "react"

export default function Search({handleSearch, searchQuery}) {

  const search = useRef();
  useEffect(() => {
    search.current.value = searchQuery;
    if (searchQuery !== "") {
      search.current.focus();
    }
  }, [searchQuery])
  return (
    <div id="searchbar">
      <span className="material-symbols-outlined">search</span>
      <input ref={search} type="text" name="search" id="searchINP" placeholder="Search" value={searchQuery} onInput={(e) => handleSearch(e.target.value)}/>
      <span className="material-symbols-outlined" id="closeSearchBTN" onClick={() => { handleSearch("") }}>close</span>

    </div>
  )
}
