import { useRef, useState } from "react";
import Chip from "./Chip";

export default function TagSearch({tags, chosenTags, setChosenTags, closeTagSearch}) {

  const searchQ = useRef();

  const handleTagClick = (tag) => {
    console.log(tag)
    if (chosenTags.includes(tag)) {
      setChosenTags(chosenTags.filter((t) => {
        return t !== tag;
      }));
    }
    else {
      setChosenTags(chosenTags.concat([tag]));
    }
  }

  const [filteredTags, setFilteredTags] = useState(tags);

  const handleSearch = () => {
    setFilteredTags(tags.filter((tag) => {
      if (searchQ.current.value !== "") {
        return tag.toUpperCase().includes(searchQ.current.value.toUpperCase());
      }
      return true;
    }))
  };

  return (
    <div id="tagsearch">
      <div id="tagsearchbar">
          <span className="material-symbols-outlined">tag</span>
          <input onInput={handleSearch} type="text" ref={searchQ} name="tagsearchINP" id="tagsearchINP" placeholder="Search for tags..."/>
          <input id="tagsearchdone" className="material-symbols-outlined" type="button" value="done" onClick={() => { closeTagSearch() }}/>
      </div>
      <div id="tagsearchresult">{
          filteredTags.map((tag) => {
              return (
                  <Chip key={tag} text={tag} handleTagClick={handleTagClick} active={chosenTags.includes(tag)}/>
              );
          })
        }
        { filteredTags.length === 0 && <span>No matching tags found!</span> }
        </div>
    </div>
  )
}
