import { createContext, useReducer } from "react"

export const PostContext = createContext();

export const postReducer = (state, action) => {
  switch (action.type) {
    case "GET_POST":
      return { posts: action.payload };
    case "CREATE_POST":
      return { posts: [action.payload, ...state.posts] };
    case "DELETE_POST":
      return { posts: state.posts.filter((p) => p._id !== action.payload._id) };
    case "UPDATE_POST":
      return {
        posts: state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    default:
      return state;
  }
};

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, { posts: [] });

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
