import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import axios from "../../service/axios";

import { Link, useNavigate } from "react-router-dom";

export const AddPost = () => {
  const [imageUrl, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [text, setText] = React.useState("");
  const navigate = useNavigate();

  const inputRef = React.useRef(null);

  const handleChangeFile = async (value) => {
    try {
      const formData = new FormData();
      const file = value.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/uploads", formData);
      console.log(data.url);
      setImage(data.url);
    } catch (error) {
      console.log(error);
      alert("Error!!");
    }
  };

  const createPost = async () => {
    try {
      const postObj = {
        title,
        tags,
        text,
        imageUrl,
      };
      const { data } = await axios.post("/posts", postObj);
      console.log("Succes " + data);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Cannot create post");
    }
  };

  const onClickRemoveImage = () => {
    setImage("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить фото
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>

          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        onChange={(e) => setTags(e.target.value)}
        value={tags}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={createPost} size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
