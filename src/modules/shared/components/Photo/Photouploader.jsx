import { useDispatch, useSelector } from "react-redux";
import { uploadActions } from "../../../../store/reducers/upload-slice";
// import { CloseIcon, Dialog } from "@fluentui/react-northstar";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  Button,
  Divider,
} from "@fluentui/react-components";
import { Flex, Primitive } from "@fluentui/react-migration-v0-v9";
import { ArrowUploadRegular, Dismiss24Regular } from "@fluentui/react-icons";
import { FilesUploadIcon } from "@fluentui/react-northstar";

export const Uploader = () => {
  const dispatch = useDispatch();
  const showUploader = useSelector((state) => state.upload.showUploader);

  const closeUploader = () => {
    dispatch(uploadActions.toggleShowUploader());
  };

  const uploadPhotos = () => {
    dispatch(uploadActions.toggleShowUploader());
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files;
    const numberOfFiles = newFile.length;
    console.log(numberOfFiles);
    // if (newFile && !fileList.includes(newFile)) {
    //   for (let i = 0; i < numberOfFiles; i++) {
    //     newFile[i]["previewUrl"] = URL.createObjectURL(newFile[i]);
    //   }
    //   const updatedList = [...fileList, ...newFile];
    //   setFileList(updatedList);
    // }
  };

  const ModalPopup = (props) => {
    return (
      <Dialog open={showUploader}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle
              action={
                // <DialogTrigger action="closeUploader()">
                <DialogTrigger >
                  <Button
                    appearance="subtle"
                    aria-label="close"
                    icon={<Dismiss24Regular />}
                    // action={closeUploader()}
                  />
                </DialogTrigger>
                // </DialogTrigger>
              }
            >
              Upload photos
            </DialogTitle>
            <DialogContent>{props.children}</DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      //   <Dialog
      //     content={props.children}
      //     cancelButton="Close"
      //     headerAction={{
      //       icon: <CloseIcon />,
      //       title: "Close",
      //       onClick: () => closeUploader(),
      //     }}
      //     confirmButton="Start Upload"
      //     header="Upload Photos"
      //     open={showUploader}
      //     onConfirm={() => uploadPhotos()}
      //     onCancel={() => closeUploader()}
      //     closeOnOutsideClick={false}
      //   />
    );
  };

  return (
    <ModalPopup>
      <Divider style={{ marginBottom: "1rem" }} />
      <Flex column gap="gap.medium">
        {/* <FlexItem> */}
        <div>
          <Primitive
            styles={{
              border: "1px dashed #ccc",
              textAlign: "center",
              padding: "24px",
              width: "100%",
              borderRadius: "6px",
            }}
          >
            <Flex gap="gap.medium" hAlign="center" vAlign="center">
              <ArrowUploadRegular size="larger" />
              <input
                type="file"
                value=""
                multiple="multiple"
                onChange={onFileDrop}
              />
            </Flex>
            {/* <Button content="Capture image" onClick={() => openCamera()} />
              <Button
                content="Capture VideoAndimage"
                onClick={() => openVideo()}
              /> */}
          </Primitive>
        </div>
        {/* </FlexItem> */}
        {/* <FlexItem>
          {fileList.length ? (
            <Box
              styles={{
                maxHeight: "170px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Grid columns="2" style={{ margin: "0 -4px" }}>
                {fileList.map((item, index) => (
                  <div style={{ padding: "4px" }}>
                    <Attachment
                      key={index}
                      icon={<Avatar image={item.previewUrl} />}
                      header={item.name}
                      actionable
                      action={{
                        icon: <CloseIcon />,
                        onClick: () => fileRemove(item),
                        title: "Close",
                      }}
                    ></Attachment>
                  </div>
                ))}
              </Grid>
            </Box>
          ) : null}
        </FlexItem> */}
      </Flex>
    </ModalPopup>
  );
};
