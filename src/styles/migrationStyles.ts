import { makeStyles } from '@fluentui/react-components';
import { flexItem } from '@fluentui/react-migration-v0-v9';

export const useStyles = makeStyles({
  flexItemPushColumn: {
    ...flexItem.grow(true),
    ...flexItem.pushColumn(),
  },
});