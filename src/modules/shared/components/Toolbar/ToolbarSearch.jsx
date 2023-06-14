import React, {  } from "react";
import { useDispatch } from "react-redux";

import { Input } from "@fluentui/react-components";
import { SearchIcon } from "@fluentui/react-icons-northstar";
import { debounce } from "lodash";
import { Search24Regular } from "@fluentui/react-icons";

export const ToolbarSearch = () => {
  const dispatch = useDispatch();
  const searchRef = React.useRef();


  const getPhotoList = debounce((searchValue) => {
    // getPhotos(searchValue, false).then((data) => {
    //   const imageList = data.Response.value;
    //   dateModification(imageList);
    // });
  }, 500);

  const clearSearch = (event, input) => {
    const searchValue = input.value;
    event.stopPropagation();
    getPhotoList(searchValue);
  };

  return (
    <>
      {/* <Input
        fluid
        icon={<SearchIcon />}
        clearable
        onChange={(event, search) => {
          clearSearch(event, search);
        }}
        ref={searchRef}
        placeholder="Search photos..."
      /> */}
      <Input fluid contentAfter={<Search24Regular />}/>

    </>
  );
};
