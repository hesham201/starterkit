import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducer/LayoutSlice";
import ThemeCustomizerSlice from "./Reducer/ThemeCustomizerSlice";
import BookmarkHeaderSlice from "./Reducer/BookmarkHeaderSlice";
import ProjectSlice from "./Reducer/ProjectSlice";
const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    themeCustomizer: ThemeCustomizerSlice,
    bookmarkHeader: BookmarkHeaderSlice,
    project: ProjectSlice,
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
