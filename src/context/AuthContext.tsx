import { createContext, useContext, useReducer } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type State = {
  isAuthenticated: boolean;
  user: User | null;
  login?: (payload: User) => void;
  logout?: () => void;
};

export type Action = {
  type: "LOGIN" | "LOGOUT";
  payload: User | undefined;
};

const initialState: State = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext(initialState);

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (payload: User) => {
    dispatch({ type: "LOGIN", payload });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
