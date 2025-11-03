"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { technologies, technologyCategories } from "@/data/technologies";

export default function TechnologiesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTechs = selectedCategory
    ? technologies.filter((tech) => tech.category === selectedCategory)
    : technologies;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary to-primaryLight text-white px-6 py-20 text-center relative">
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>
        
        <h1 className="text-5xl font-black mb-4">Công Nghệ</h1>
        <p className="text-base opacity-95 max-w-2xl mx-auto">
          Khám phá các công nghệ tiên tiến đằng sau sản phẩm của Unipalm
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
          {technologyCategories.map((cat) => (
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

      <div className="max-w-4xl mx-auto px-6 space-y-4 pb-8">
        {filteredTechs.map((tech) => (
          <Link
            key={tech.id}
            href={`/technologies/${tech.id}`}
            className="flex gap-4 bg-white border border-border rounded-3xl p-5 hover:shadow-lg transition-shadow"
          >
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${tech.gradient[0]}, ${tech.gradient[1]})`,
              }}
            >
              <span className="text-3xl">{tech.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{tech.category}</p>
              <h3 className="text-lg font-bold text-black mb-1">{tech.title}</h3>
              <p className="text-sm text-textGray mb-3 line-clamp-2">{tech.subtitle}</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-textLight" />
                  <span className="text-xs text-textLight">{tech.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-textLight" />
                  <span className="text-xs text-textLight">{tech.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}