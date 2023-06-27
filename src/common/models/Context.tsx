//import { TeamsUserCredential } from "@microsoft/teamsfx";
import { createContext } from "react";
import { Theme } from "@fluentui/react-components";

export const TeamsFxContext = createContext<{
  theme?: Theme;
  themeString: string;
  teamsUserCredential?: any;
}>({
  theme: undefined,
  themeString: "",
  teamsUserCredential: undefined,
});

export interface iTabContext{
  teamId: string;
  channelId: string;
  channelName: string;
  createdBy: string;
  token: string;
}

export interface iPhotoList{
  "@search.score": number
  id: string
  TeamId: string
  ChannelId: string
  ItemId: string
  Name: string
  CreatedBy: string
  tags: string[]
  fileUrl: string
}
