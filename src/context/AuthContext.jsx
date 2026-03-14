import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

const [user, setUser] = useState(
JSON.parse(localStorage.getItem("user")) || null
);

const login = async (email, password) => {

const users = JSON.parse(localStorage.getItem("users")) || [];

const found = users.find(
u => u.email === email && u.password === password
);

if (!found) {
alert("Wrong email or password ❌");
throw new Error("login failed");
}

if (found.role === "vendor" && !found.approved) {
alert("Vendor account waiting for admin approval");
return;
}

localStorage.setItem("user", JSON.stringify(found));
setUser(found);

};

const signup = async (data) => {

const users = JSON.parse(localStorage.getItem("users")) || [];

const newUser = {
...data,
approved: data.role === "vendor" ? false : true
};

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));

alert("Signup successful");

};

const logout = () => {
localStorage.removeItem("user");
setUser(null);
};

return (
<AuthContext.Provider
value={{
user,
login,
signup,
logout,
isAuthenticated: !!user
}}
>
{children}
</AuthContext.Provider>
);

}

export function useAuth() {
return useContext(AuthContext);
}