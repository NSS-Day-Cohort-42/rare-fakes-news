import React from "react"
import { Route } from "react-router-dom"
import { TagProvider } from "./Tags/TagProvider"
import { TagForm } from "./Tags/TagForm"
import { TagList } from "./Tags/TagList"
import {HomeList} from "./Profiles/HomeList"
import { UserProvider } from "./Profiles/UserProvider"
import { UserDetail } from "./Profiles/UserDetail"
import { CategoryProvider } from "./Categories/CategoryProvider";
import { CategoryForm } from "./Categories/CategoryForm";
import { CategoryList } from "./Categories/CategoryList";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      ></main>

      <Route exact path="/home">
        <HomeList />
      </Route>


      <TagProvider>
        <Route
          exact
          path="/tags/create"
          render={(props) => {
            return <TagForm {...props} />;
          }}
        />
        <Route
          exact
          path="/tags"
          render={(props) => {
            return <TagList {...props} />;
          }}
        />
      </TagProvider>


      <UserProvider>
        <Route 
          path="/profile" 
          render={props => <UserDetail {...props} />}/>
      </UserProvider>


      <CategoryProvider>
        <Route
          exact
          path="/newCategory"
          render={(props) => <CategoryForm {...props} />}
        />
        <Route
          exact
          path="/categories"
          render={(props) => <CategoryList {...props} />}
        />
        <Route
          exact
          path="/categories/create"
          render={(props) => <CategoryForm {...props} />}
        />
      </CategoryProvider>
    </>
  );
};
