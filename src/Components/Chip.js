export default function Chip({text, active, handleTagClick}) {
  return (
    <div className="chip" onClick={() => handleTagClick(text)}>
        {active && <span className="material-symbols-outlined">check</span>}
        <span>{text}</span>    
    </div>
  )
}
