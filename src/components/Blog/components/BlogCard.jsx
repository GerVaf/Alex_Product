/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const BlogCard = ({ data }) => {
  return (
    <Link
      to={`/blog/${data?._id}`}
      className="col-span-1 rounded border shadow overflow-hidden"
    >
      <div className="w-full aspect-[2/1] relative">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={data?.image}
          alt=""
        />
      </div>
      <div className="py-2">
        <p className="px-3 pb-2 text-base">{data?.title}</p>
        <div className="px-5 text-sm">
          {data?.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: truncateText(data.content, 100), 
              }}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
