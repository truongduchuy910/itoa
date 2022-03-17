export default function PostListUI({ allPosts, _allPostsMeta, clickMore }) {
  return (
    <pre>
      Component chưa được phát triển giao diện.
      {allPosts?.map((post) => {
        return (
          <div>
            <h2>{post.title}</h2>
          </div>
        );
      })}
    </pre>
  );
}
