import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetBlogById } from "../../../api/hooks/useQuery";

const ReadBlog = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogById(id);

  const blog = data?.data;
  useEffect(() => {
    // You can perform additional side effects here if necessary
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">By {blog.author}</p>
      <p className="text-gray-500 mb-4">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-[2/1] object-cover mb-3"
        />
      )}
      {blog?.content && (
        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      )}
    </div>
  );
};

export default ReadBlog;
