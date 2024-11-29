import { useEffect, useState } from "react";
import { useGetBlog } from "../../api/hooks/useQuery";
import BlogCard from "./components/BlogCard";

const Blog = () => {
  const [page, setPage] = useState(1); // State for the current page
  const limit = 5; // Fixed limit for the number of blog posts per page
  const { data, isLoading, error, isFetching } = useGetBlog(page, limit); // Fetch blogs based on current page and fixed limit

  console.log(data);

  // Handle blog posts from the fetched data
  const blogPosts = data?.data?.blogs || []; // Get the list of blog posts from the fetched data
  const currentPage = data?.data?.table?.currentPage || 1; // Current page from the response
  const totalPages = data?.data?.table?.totalPages || 0; // Total pages from the response

  if (isLoading) {
    return <div>Loading...</div>; // Loading message for the first fetch
  }

  // Handle error state
  if (error) {
    return <div>Error loading blogs: {error.message}</div>; // Error message
  }

  return (
    <div className="p-3 flex flex-col gap-5">
      <h1 className="text-lg hero-font">The Latest Content For You Mate</h1>
      <div className="grid grid-cols-1 gap-5">
        {blogPosts.map((blog) => (
          <BlogCard key={blog._id} data={blog} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-1 border-2 text-blue-500 border-blue-500  rounded-full disabled:bg-gray-300 disabled:text-white disabled:border-0"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-5 py-1 border-2 text-blue-500 border-blue-500  rounded-full disabled:bg-gray-300 disabled:text-white disabled:border-0"
        >
          Next
        </button>
      </div>
      {isFetching && <div>Loading more posts...</div>}{" "}
    </div>
  );
};

export default Blog;
