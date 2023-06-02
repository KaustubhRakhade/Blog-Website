import { useEffect, useRef } from "react"

export default function Search({handleSearch, searchQuery}) {

  const search = useRef();
  useEffect(() => {
    search.current.value = searchQuery;
    if (searchQuery !== "") {
      search.current.focus();
    }
  }, [searchQuery])

  const openSearch = () => {
    // search.current.style.display = "inline-block";
    search.current.focus()
  }

  return (
    <div id="searchbar">
      <span onClick={openSearch} className="material-symbols-outlined">search</span>
      <input ref={search} autoComplete="off" type="text" name="search" id="searchINP" placeholder="Search" value={searchQuery} onInput={(e) => handleSearch(e.target.value)}/>
      <span className="material-symbols-outlined" id="closeSearchBTN" onMouseDown={() => { handleSearch("") }}>close</span>

    </div>
  )
}
