"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Eye, User, Wand2 } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blogs";

export default function BlogPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary to-primaryLight text-white px-6 py-20 text-center relative">
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>
        
        <Link
          href="/blog-create"
          className="absolute top-5 right-5 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full"
        >
          <Wand2 className="w-5 h-5 text-white" strokeWidth={2.5} />
          <span className="text-sm font-bold text-white">Tạo Blog AI</span>
        </Link>
        
        <h1 className="text-5xl font-black mb-4">Blog</h1>
        <p className="text-base opacity-95 max-w-2xl mx-auto">
          Tin tức, kiến thức và xu hướng về chống nắng & chăm sóc da
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-extrabold text-black mb-4">Danh Mục</h2>
        <div className="flex gap-3 overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-3 rounded-3xl font-semibold border-2 whitespace-nowrap ${
              !selectedCategory
                ? "bg-primary border-primary text-white"
                : "bg-backgroundBeige border-transparent text-black"
            }`}
          >
            Tất Cả
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 rounded-3xl font-semibold border-2 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-primary border-primary text-white"
                  : "bg-backgroundBeige border-transparent text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-5 pb-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block bg-white border border-border rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <div
              className="h-48 flex items-end p-4"
              style={{
                background: `linear-gradient(135deg, ${post.coverImage}, ${post.coverImage}CC)`,
              }}
            >
              <div className="bg-white px-4 py-2 rounded-2xl">
                <p className="text-xs font-bold text-primary uppercase">{post.category}</p>
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-extrabold text-black mb-3 leading-tight">{post.title}</h2>
              <p className="text-sm text-textGray mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: post.author.avatar }}
                  >
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-black">{post.author.name}</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-textLight" />
                    <span className="text-xs text-textLight">{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-textLight" />
                    <span className="text-xs text-textLight">{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}