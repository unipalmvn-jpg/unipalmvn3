"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Target, Heart, Leaf, Users, Award, TrendingUp } from "lucide-react";

const milestones = [
  { year: "2020", title: "Khởi Đầu", desc: "Ra mắt sản phẩm đầu tiên" },
  { year: "2021", title: "Phát Triển", desc: "Mở rộng 10 cửa hàng" },
  { year: "2023", title: "Đột Phá", desc: "50,000+ khách hàng" },
  { year: "2025", title: "Tương Lai", desc: "Dẫn đầu thị trường" },
];

const values = [
  { icon: Heart, title: "Yêu Thương", desc: "Quan tâm đến sức khỏe làn da người Việt" },
  { icon: Leaf, title: "Bền Vững", desc: "Sản phẩm thân thiện với môi trường" },
  { icon: Award, title: "Chất Lượng", desc: "Công nghệ tiên tiến, chất lượng đảm bảo" },
  { icon: Users, title: "Cộng Đồng", desc: "Xây dựng cộng đồng yêu thời trang" },
];

const team = [
  { name: "Nguyễn Minh", role: "CEO & Founder", avatar: "#97d7d9" },
  { name: "Trần Hà", role: "Creative Director", avatar: "#f6c785" },
  { name: "Lê Thu", role: "Product Manager", avatar: "#b2d235" },
  { name: "Phạm Nam", role: "Tech Lead", avatar: "#c6a9b5" },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary to-primaryLight text-white px-6 py-20 text-center relative">
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>
        
        <h1 className="text-5xl font-black mb-3">Về Chúng Tôi</h1>
        <p className="text-xl font-bold mb-4">Unipalm - Chống nắng có Gu</p>
        <p className="text-base opacity-95 max-w-2xl mx-auto">
          Bảo vệ làn da người Việt với công nghệ UPF 50+ và phong cách hiện đại
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-backgroundBeige rounded-3xl p-8 text-center mb-8">
          <Target className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={2} />
          <h2 className="text-2xl font-extrabold text-black mb-3">Sứ Mệnh</h2>
          <p className="text-base text-textGray leading-relaxed">
            Mang đến giải pháp chống nắng toàn diện, kết hợp công nghệ tiên tiến
            và thiết kế thời trang, giúp người Việt tự tin tỏa sáng dưới ánh mặt
            trời nhiệt đới.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-black mb-6">Hành Trình Phát Triển</h2>
          <div className="space-y-5">
            {milestones.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-16 text-center pt-1">
                  <p className="text-lg font-extrabold text-primary">{item.year}</p>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md" />
                  {index < milestones.length - 1 && (
                    <div className="absolute left-[7px] top-6 w-0.5 h-16 bg-border" />
                  )}
                  <div className="pl-8 pb-3">
                    <h3 className="text-lg font-bold text-black mb-1">{item.title}</h3>
                    <p className="text-sm text-textGray">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-black mb-6">Giá Trị Cốt Lõi</h2>
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div key={index} className="bg-backgroundBeige rounded-3xl p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
                  <value.icon className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-black mb-2">{value.title}</h3>
                <p className="text-sm text-textGray leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-black mb-6">Đội Ngũ Lãnh Đạo</h2>
          <div className="grid grid-cols-2 gap-4">
            {team.map((member, index) => (
              <div key={index} className="bg-white border border-border rounded-3xl p-5 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: member.avatar }}
                >
                  <span className="text-3xl font-extrabold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-base font-bold text-black mb-1">{member.name}</h3>
                <p className="text-sm text-textGray">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-primaryDark rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-3 gap-6 text-center text-white">
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-3" strokeWidth={2} />
              <p className="text-3xl font-black mb-1">50,000+</p>
              <p className="text-sm">Khách Hàng</p>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-3" strokeWidth={2} />
              <p className="text-3xl font-black mb-1">100+</p>
              <p className="text-sm">Sản Phẩm</p>
            </div>
            <div>
              <Users className="w-8 h-8 mx-auto mb-3" strokeWidth={2} />
              <p className="text-3xl font-black mb-1">15</p>
              <p className="text-sm">Cửa Hàng</p>
            </div>
          </div>
        </div>

        <div className="text-center py-10">
          <h2 className="text-3xl font-extrabold text-black mb-3">Sẵn Sàng Trải Nghiệm?</h2>
          <p className="text-base text-textGray mb-8">
            Khám phá bộ sưu tập chống nắng độc đáo của Unipalm
          </p>
          <Link
            href="/shop"
            className="inline-block bg-primary hover:bg-primaryDark text-white font-bold px-10 py-4 rounded-full shadow-lg transition-colors"
          >
            Mua Sắm Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}