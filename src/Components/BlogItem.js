import { useState } from "react";
import Chip from "./Chip";

export default function BlogItem({blog, deleteBlog, handleSearch, editBlog}) {

  const [active, setActive] = useState(false)

    const handleDelete = () => {
        deleteBlog(blog.time);
    }

    const handleEdit = () => {
        editBlog(blog);
    }

    let timeGap = Date.now() - blog.time;
    let descTimeGap = "just now";

    const timeUnits = [
        {
            time: 1000*3600*24*365,
            text: "year(s) ago"
        },
        {
            time: 1000*3600*24*30,
            text: "month(s) ago"
        },
        {
            time: 1000*3600*24*7,
            text: "week(s) ago"
        },
        {
            time: 1000*3600*24,
            text: "day(s) ago"
        },
        {
            time: 1000*3600,
            text: "hour(s) ago"
        },
        {
            time: 1000*60,
            text: "minute(s) ago"
        },
        {
            time: 1000*1,
            text: "second(s) ago"
        }
    ]

    for (let unit of timeUnits) {
        if (timeGap > unit.time) {
            descTimeGap = Math.round(timeGap / unit.time) + " " + unit.text;
            break;
        }
    }
 
  return (
    <div className={"blogitem" + (active ? " active" : "")} onClick={() => { setActive(!active) }}>
        <span className="blogtitle">{blog.title}</span>
        <span className="blogmeta">{blog.author} • {descTimeGap}</span>
        <span className="blogcontent">{blog.content}</span>
        <div className="blogitem-bottom">
            <div className="blogtags">{
                blog.tags.map((tag) => {
                    return (
                        <Chip handleTagClick={handleSearch} key={tag} text={tag} active={false}/>
                    );
                })}
            </div>
            <input title="Edit" className="editBlog material-symbols-outlined" type="button" value="edit" onClick={handleEdit}/>
            <input title="Delete" className="deleteBlog material-symbols-outlined" type="button" value="delete" onClick={handleDelete}/>

        </div>

    </div>
    )
}
