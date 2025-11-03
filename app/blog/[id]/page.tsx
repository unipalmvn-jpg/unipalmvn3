"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, User, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogs";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Không tìm thấy bài viết</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div
        className="px-6 py-20 text-white relative"
        style={{
          background: `linear-gradient(135deg, ${post.coverImage}, ${post.coverImage}CC)`,
        }}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white px-4 py-2 rounded-2xl inline-block mb-5">
            <p className="text-xs font-bold text-primary uppercase">{post.category}</p>
          </div>
          <h1 className="text-4xl font-black mb-5 leading-tight">{post.title}</h1>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: post.author.avatar }}
              >
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold">{post.author.name}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-semibold">{post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-base text-textGray leading-relaxed mb-8 font-medium">{post.content.intro}</p>

        {post.content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-extrabold text-black mb-3">{section.heading}</h2>
            <p className="text-base text-textGray leading-relaxed">{section.text}</p>
          </div>
        ))}

        <div className="bg-backgroundBeige rounded-3xl p-6 mb-8">
          <h2 className="text-xl font-extrabold text-black mb-3">Kết Luận</h2>
          <p className="text-base text-textGray leading-relaxed">{post.content.conclusion}</p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Tag className="w-5 h-5 text-primary" />
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag, index) => (
              <div key={index} className="bg-backgroundGray border border-border px-4 py-2 rounded-2xl">
                <span className="text-sm text-textGray font-semibold">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-black mb-4">Bài Viết Liên Quan</h2>
          {blogPosts
            .filter((p) => p.id !== post.id && p.category === post.category)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="flex gap-4 bg-white border border-border rounded-2xl overflow-hidden mb-3 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-24 h-24 flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${relatedPost.coverImage}, ${relatedPost.coverImage}CC)`,
                  }}
                />
                <div className="flex-1 py-3 pr-3">
                  <p className="text-xs font-bold text-primary uppercase mb-1">{relatedPost.category}</p>
                  <h3 className="text-sm font-bold text-black mb-2 line-clamp-2">{relatedPost.title}</h3>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-textLight" />
                      <span className="text-xs text-textLight">{relatedPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-textLight" />
                      <span className="text-xs text-textLight">{relatedPost.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <Link
          href="/blog"
          className="block bg-primary hover:bg-primaryDark text-white font-bold px-8 py-4 rounded-full text-center shadow-lg transition-colors"
        >
          Xem Thêm Bài Viết
        </Link>
      </div>
    </div>
  );
}