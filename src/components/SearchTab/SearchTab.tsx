import React, { useState } from "react";
import './SearchTab.css'
import _ from "lodash";
import List from "../List/List";

function SearchTab() {
  const [search, setSearch] = useState("matrix");

  const debouncedSearch = React.useRef(
    _.debounce(async (e) => {
      setSearch(await e.target.value);
    }, 500)
  ).current;

  return (
    <form>
      <input
        onChange={debouncedSearch}
        type="text"
        placeholder="Search Movie"
      />

      <List search={search} />
    </form>
  );
}

export default SearchTab;
