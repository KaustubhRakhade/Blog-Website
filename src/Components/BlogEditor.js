import { useEffect, useRef, useState } from "react";
import TagSearch from "./TagSearch";
import Chip from "./Chip";

export default function BlogEditor({ addBlog, tags, visible, template }) {

  const title = useRef();
  const author = useRef();
  const content = useRef();
  const newtags = useRef();
  const postBTN = useRef();

  const [chosenTags, setChosenTags] = useState([]);
  const [tagSearchOpen, setTagSearchOpen] = useState(false);
  const [editorOff, setEditorOff] = useState(true);

  useEffect(() => {
    // Anything in here is fired on component mount.
    const handleReload = (e) => {
      if (!editorOff && (
        title.current.value !== "" ||
        author.current.value !== "" ||
        content.current.innerText !== "" ||
        chosenTags.length !== 0
      )) {
        e.preventDefault()
        e.returnValue = true;
      }
    }

    window.addEventListener('beforeunload', handleReload);

    return () => {
      // Anything in here is fired on component unmount.
      window.removeEventListener('beforeunload', handleReload)
    }
  })

  const openEditor = () => {
    setEditorOff(false);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    content.current.focus()
  }, [editorOff])

  useEffect(() => {
    title.current.value = template.title;
    author.current.value = template.author;
    content.current.innerText = template.content;
    setChosenTags(template.tags);
    if (template.title !== "") {
      setEditorOff(false)
    }
  }, [template])

  const checkInputs = () => {

    postBTN.current.classList.remove("disabled");

    if (title.current.value === "") {
      postBTN.current.classList.add("disabled");
    }

    if (author.current.value === "") {
      postBTN.current.classList.add("disabled");
    }

    if (content.current.innerText === "") {
      postBTN.current.classList.add("disabled");
    }

    if (chosenTags.length === 0) {
      postBTN.current.classList.add("disabled");
    } else {
      newtags.current.classList.remove("error");
    }
  }

  useEffect(checkInputs, [chosenTags]);

  const handleClick = () => {
    console.log(Date.now())

    if (title.current.value === "") {
      title.current.classList.add("error");
      title.current.scrollIntoView({ behavior: "smooth", block: 'center' });
      return;
    }

    if (author.current.value === "") {
      author.current.classList.add("error");
      author.current.scrollIntoView({ behavior: "smooth", block: 'center' });
      return;
    }

    if (content.current.innerText === "") {
      content.current.classList.add("error");
      return;
    }

    if (chosenTags.length === 0) {
      newtags.current.classList.add("error");
      return;
    }

    const blogOBJ = {
      title: title.current.value,
      author: author.current.value,
      content: content.current.innerText,
      tags: chosenTags,
      time: Date.now()
    };

    title.current.classList.remove("error");
    author.current.classList.remove("error");
    content.current.classList.remove("error");
    newtags.current.classList.remove("error");

    //This works!
    setTimeout(() => {
      setEditorOff(true);
    }, 10);

    //This doesnt work
    // setEditorOff(true);

    setTimeout(() => {
      setTagSearchOpen(false);
      title.current.value = '';
      author.current.value = '';
      content.current.innerText = '';
      title.current.classList.remove("error");
      author.current.classList.remove("error");
      content.current.classList.remove("error");
      newtags.current.classList.remove("error");
      setChosenTags([]);
    }, 250);

    addBlog(blogOBJ);
  }

  return (
    <>
      <input style={!visible ? { display: "none" } : null} className="FAB material-symbols-outlined" type="button" value="add" onClick={openEditor} />

      <div style={!visible ? { display: "none" } : null} id="newblog" className={editorOff ? "off" : ""} onClick={openEditor}>

        <input defaultValue={template.title} type="text" onInput={checkInputs} autoComplete="off" ref={title} name="title" id="newtitle" placeholder="TITLE" />
        <input defaultValue={template.author} type="text" onInput={checkInputs} autoComplete="off" ref={author} name="author" id="newauthor" placeholder="Author" />
        <span contentEditable onInput={checkInputs} ref={content} name="content" id="newcontent" placeholder="Write something new..." ></span>
        <div id="newtags" ref={newtags}>
          <div id="addtag" onClick={() => { setTagSearchOpen(!tagSearchOpen) }}>
            <span className="material-symbols-outlined">add</span>
            <span>Tag</span>
          </div>
          {
            chosenTags.map((tag) => {
              return (
                <Chip handleTagClick={() => { }} key={tag} text={tag} active={false} />
              );
            })
          }
          <input ref={postBTN} id="newpost" type="button" value="Post" onClick={() => handleClick()} />
        </div>
        {tagSearchOpen && <TagSearch closeTagSearch={() => { setTagSearchOpen(false) }} tags={tags} chosenTags={chosenTags} setChosenTags={setChosenTags} />}

      </div>

    </>
  )
}
