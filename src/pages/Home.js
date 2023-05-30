import { useEffect, useState } from 'react';
import BlogItem from "../Components/BlogItem";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import BlogEditor from "../Components/BlogEditor";

export default function Home() {

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

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
    const newblogs = [blog, ...blogs];
    updateBlogs(newblogs);
  };

  const deleteBlog = (time) => {
    const newblogs = blogs.filter((blog) => {
      return blog.time !== time;
    });
    updateBlogs(newblogs);
  };

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (searchQ) => {
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

      { searchQuery === "" &&
      <BlogEditor tags={tags} addBlog={addBlog} /> }

      {blogs &&
        filteredBlogs.map((blog) => {
          return (
            <BlogItem key={blog.time} deleteBlog={deleteBlog} blog={blog} handleSearch={handleSearch} />
          );
        })}
    </>
  );
}
