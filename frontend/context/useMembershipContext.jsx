import { createContext, useReducer } from "react";

export const MembershipContext = createContext();

const membershipReducer = (state, action) => {
    switch (action.type) {
        case "SUBMIT_FORM":
            return { ...state, user: action.payload };

        case "SHOW_USERS":
            return { ...state, users: action.payload };

        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.filter((u) => u._id !== action.payload._id),
            };
        case "REMOVE_USER":
            return {
                ...state,
                users: state.users.filter((u) => u._id !== action.payload),
            };

        default:
            return state;
    }
};

export const MembershipContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(membershipReducer, {
        user: null,
        users: [],
    });

    return (
        <MembershipContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MembershipContext.Provider>
    );
};
