import "../../../common/css/Tab.css";
import React, { useEffect, useState } from "react";
import { getPhotos } from "../../../services/galleryListing";
import { ToolbarSearch } from "../../shared/components/Toolbar/ToolbarSearch";
import { Button, Input, Divider } from "@fluentui/react-components";
import { AddIcon, Flex, SearchIcon } from "@fluentui/react-northstar";
import { Add24Regular } from "@fluentui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { uploadActions } from "../../../store/reducers/upload-slice";
import { Uploader } from "../../shared/components/Photo/Photouploader";

export default function Home() {
  const dispatch = useDispatch();
  const showUploader = useSelector((state: any) => state.upload.showUploader);
  const [imgSrc, setImg] = useState("https://picsum.photos/200/300");

  useEffect(() => {
    // getPhotos().then((res) => console.log(res));
  });

  const toggleShowUploader = () => {
    dispatch(uploadActions.toggleShowUploader()); // dispatch global
  };

  return (
    <>
      {/* <div className="welcome page">
        <div className="narrow page-padding">
          <h1>Welcome to Teams Custom App.</h1>
        </div>
      </div> */}
      {showUploader ? <Uploader /> : null}

      <div className="ms-Grid">
        <div className="ms-Grid-row" style={{ marginTop: "10px" }}>
          <div
            style={{ marginBottom: "10px", marginTop: "5px" }}
            className="ms-Grid-col ms-xl10 ms-lg8 ms-md6 ms-sm12"
          >
            <ToolbarSearch />
          </div>
          <div className="ms-Grid-col ms-xl2 ms-lg4 ms-md6 ms-sm12">
            <Flex
              gap="gap.small"
              // grow="true"
              hAlign="end"
              style={{ marginTop: "4px" }}
            >
              {/* {uploadInProgress ? (
                <div>
                  <Button
                    loading={loading}
                    content={`Uploading ${filesUploaded} of ${fileCount}`}
                    onClick={() => toggleShowUploadProgress()}
                  />
                </div>
              ) : null} */}
              <div>
                <Button
                  icon={<Add24Regular />}
                  iconPosition="before"
                  appearance="primary"
                  onClick={() => toggleShowUploader()}
                >
                  Upload
                </Button>
              </div>
            </Flex>
          </div>
        </div>
      </div>
      <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <img src={imgSrc} />
    </>
  );
}
