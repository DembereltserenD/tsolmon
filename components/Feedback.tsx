"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackItem {
  label: string;
  percentage: number;
  count?: number;
}

interface FeedbackProps {
  title: string;
  middleText: string;
  subtitle: string;
  items: FeedbackItem[];
}

export default function Feedback({ title, middleText, subtitle, items }: FeedbackProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-4 sm:p-6 max-w-[1230px] mx-auto">
      <h2 className="text-base sm:text-lg font-bold text-[#003277] mb-4">{title}</h2>
      <p className="text-sm text-gray-800 font-medium mb-3">{middleText}</p>
      <p className="text-sm text-gray-600 mb-6">{subtitle}</p>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-20 text-right text-sm text-[#003277] font-medium">
              {item.percentage.toFixed(2)}%
            </div>
            <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#003277] rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <div className="flex-1 text-sm text-gray-600">
              {item.label}
              {item.count !== undefined && (
                <span className="text-[#003277] ml-2">({item.count})</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Нэр
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              И-мэйл
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Санал хүсэлт
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full sm:w-auto bg-[#003277] text-white hover:bg-[#002255] transition-colors"
        >
          Илгээх
        </Button>
      </form>

      <div className="flex gap-2 mt-6">
        <Button
          type="button"
          className="px-4 py-2 text-sm bg-[#003277] text-white rounded hover:bg-blue-800 transition-colors"
        >
          Санал өгөх
        </Button>
        <Button
          type="button"
          className="px-4 py-2 text-sm border border-[#003277] text-[#003277] rounded hover:bg-gray-50 transition-colors"
        >
          Бусад санал асуулга
        </Button>
      </div>
    </Card>
  );
}
