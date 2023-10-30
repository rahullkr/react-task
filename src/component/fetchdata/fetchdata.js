import React, { useState, useEffect, useRef } from "react";

const AdvancedDataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  useEffect(() => {
    const fetchData = async (pageNumber) => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10&q=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData((prevData) => [...prevData, ...jsonData]);
        setLoading(false);
        setHasMore(jsonData.length > 0);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData(page);
  }, [page, searchQuery]);

  const handleObserver = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setData([]);
    setPage(1);
  };

  return (
    <div>
      <h1>Advanced Data Fetching</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        value={searchQuery}
      />
      <ul>
        {data.map((item, index) => (
          <li
            key={item.id}
            ref={index === data.length - 1 ? handleObserver : null}
          >
            {item.title}
          </li>
        ))}
      </ul>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && !hasMore && <p>No more data to load.</p>}
    </div>
  );
};

export default AdvancedDataComponent;
