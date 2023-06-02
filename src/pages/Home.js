import { useEffect, useState } from 'react';
import BlogItem from "../Components/BlogItem";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import BlogEditor from "../Components/BlogEditor";

export default function Home() {

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [template, setTemplate] = useState({
    title: "",
    author: "",
    content: "",
    tags: [],
    time: null
  });

  const tags = ["poem", "article", "story", "idea", "notes"];

  useEffect(() => {
    document.title = "readme - Home"
    let savedBlogs = JSON.parse(localStorage.getItem("blogsdata")) || [];
    setBlogs(savedBlogs);
    // setFilteredBlogs(savedBlogs);
  }, []);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const updateBlogs = (newblogs) => {
    setBlogs(newblogs);
    localStorage.setItem("blogsdata", JSON.stringify(newblogs));
    handleSearch("");
  };

  const addBlog = (blog) => {
    // const newblogs = blogs.filter((b) => {
    //   return b.time !== blog.time;
    // });
    updateBlogs([blog, ...blogs]);
    setTemplate({
      title: "",
      author: "",
      content: "",
      tags: [],
      time: null
    });
  };

  const editBlog = (blog) => {
    if (template.title === "") {
      console.log(blog)
      setTemplate(blog);
      deleteBlog(blog.time)
    }
  }

  const deleteBlog = (time) => {
    const newblogs = blogs.filter((blog) => {
      return blog.time !== time;
    });
    updateBlogs(newblogs);
  };

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (searchQ) => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    })
    setSearchQuery(searchQ);
    setFilteredBlogs(
      blogs.filter((blog) => {
        if (searchQ !== "") {
          for (let tag of blog.tags) {
            if (tag.toUpperCase().includes(searchQ.toUpperCase())) {
              return true;
            }
          }
          return false;
        }
        return true;
      })
    );
    return true;
  };

  return (
    <>
      <Navbar>
        <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
      </Navbar>

      { searchQuery !== "" &&
        <span id="searchcount">Showing {filteredBlogs.length} of {blogs.length} blogs</span>
      }

      <BlogEditor visible={searchQuery === ""} tags={tags} addBlog={addBlog} template={template}/>

      { (!blogs || blogs.length === 0) && searchQuery === "" &&
        <span id="emplyblogs">Click the <span className="material-symbols-outlined">edit</span> icon<br/>to write a new blog</span>
      }

      {blogs &&
        filteredBlogs.map((blog) => {
          return (
            <BlogItem key={blog.time} editBlog={editBlog} deleteBlog={deleteBlog} blog={blog} handleSearch={handleSearch} />
          );
        })}
    </>
  );
}
