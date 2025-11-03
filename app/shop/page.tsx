"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Star, SlidersHorizontal, ArrowLeft, Menu, GitCompare, X, Check } from "lucide-react";
import { products, categories } from "@/data/products";
import { useComparison } from "@/contexts/ComparisonContext";

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "priceAsc" | "priceDesc" | "rating">("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  const { addToComparison, isInComparison, totalItems: comparisonCount } = useComparison();

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes);
  }, []);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors);
  }, []);

  const selectedCategoryData = useMemo(() => {
    return categories.find(cat => cat.id === selectedCategory);
  }, [selectedCategory]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = true;
      if (selectedSubCategory) {
        matchesCategory = product.category === selectedSubCategory;
      } else if (selectedCategory) {
        const category = categories.find(cat => cat.id === selectedCategory);
        if (category?.subcategories) {
          const subCategoryNames = category.subcategories.map(sub => sub.name);
          matchesCategory = subCategoryNames.includes(product.category);
        } else {
          matchesCategory = product.category === selectedCategory;
        }
      }
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSize = selectedSizes.length === 0 || 
        product.sizes.some(size => selectedSizes.includes(size));
      const matchesColor = selectedColors.length === 0 ||
        product.colors.some(color => selectedColors.includes(color));
      return matchesSearch && matchesCategory && matchesPrice && matchesSize && matchesColor;
    });

    if (sortBy === "priceAsc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedSubCategory, priceRange, selectedSizes, selectedColors, sortBy]);

  return (
    <div className="min-h-screen bg-backgroundGray">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 flex items-center justify-center"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center">
                <Menu className="w-6 h-6" strokeWidth={2} />
              </button>
              <h1 className="text-3xl font-black tracking-tight">Sản Phẩm</h1>
            </div>
            {comparisonCount > 0 && (
              <Link
                href="/compare"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-bold"
              >
                <GitCompare className="w-5 h-5" />
                <span>So Sánh ({comparisonCount})</span>
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-3 bg-backgroundGray px-4 py-3 rounded-lg">
            <Search className="w-5 h-5 text-textGray" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-base font-medium"
            />
            <button onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className={`w-5 h-5 ${showFilters ? "text-primary" : "text-textGray"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-5">
            <div className="flex justify-between items-center mb-6 pb-5 border-b border-border">
              <h2 className="text-2xl font-extrabold">Bộ Lọc & Sắp Xếp</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="pb-5 border-b border-border">
                <h3 className="text-lg font-bold mb-4">Sắp Xếp Theo</h3>
                {[
                  { value: "default", label: "Mặc định" },
                  { value: "priceAsc", label: "Giá: Thấp đến Cao" },
                  { value: "priceDesc", label: "Giá: Cao đến Thấp" },
                  { value: "rating", label: "Đánh giá cao nhất" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    className="flex justify-between items-center w-full py-3"
                  >
                    <span className="text-base font-medium">{option.label}</span>
                    {sortBy === option.value && <Check className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>

              <div className="pb-5 border-b border-border">
                <h3 className="text-lg font-bold mb-4">Kích Thước</h3>
                <div className="flex flex-wrap gap-3">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSizes(prev =>
                          prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                        )
                      }
                      className={`px-5 py-3 rounded-md border-2 font-semibold ${
                        selectedSizes.includes(size)
                          ? "bg-primary border-primary text-white"
                          : "bg-backgroundGray border-border text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSortBy("default");
                    setPriceRange([0, 1000000]);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                  }}
                  className="flex-1 py-4 rounded-md bg-backgroundGray border border-border font-bold"
                >
                  Đặt Lại
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-[2] py-4 rounded-md bg-primary text-white font-bold"
                >
                  Áp Dụng ({filteredAndSortedProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-white px-5 py-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubCategory(null);
              setShowSubCategories(false);
            }}
            className={`px-6 py-3 rounded-lg font-bold border-2 whitespace-nowrap ${
              !selectedCategory
                ? "bg-black border-black text-white"
                : "bg-backgroundGray border-border text-black"
            }`}
          >
            Tất Cả
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                const newCategory = category.id === selectedCategory ? null : category.id;
                setSelectedCategory(newCategory);
                setSelectedSubCategory(null);
                setShowSubCategories(!!newCategory);
              }}
              className={`px-6 py-3 rounded-lg font-bold border-2 whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-black border-black text-white"
                  : "bg-backgroundGray border-border text-black"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Categories */}
      {showSubCategories && selectedCategoryData?.subcategories && (
        <div className="bg-backgroundGray px-5 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedSubCategory(null)}
              className={`px-5 py-2 rounded-md font-semibold border whitespace-nowrap ${
                !selectedSubCategory
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-border text-textGray"
              }`}
            >
              Tất Cả
            </button>
            {selectedCategoryData.subcategories.map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() =>
                  setSelectedSubCategory(
                    subCategory.name === selectedSubCategory ? null : subCategory.name
                  )
                }
                className={`px-5 py-2 rounded-md font-semibold border whitespace-nowrap ${
                  selectedSubCategory === subCategory.name
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-border text-textGray"
                }`}
              >
                {subCategory.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAndSortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div
                className="h-44 flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                }}
              >
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                    {product.badge}
                  </div>
                )}
                <p className="text-4xl font-black text-white/20 text-center leading-tight">
                  UPF<br />50+
                </p>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 min-h-[2.25rem]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-star fill-star" />
                  <span className="text-xs text-textGray font-semibold">{product.rating}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-extrabold text-primary">
                    {product.price.toLocaleString("vi-VN")}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-textLight line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}