'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { SettingSite } from "@/db/schema/setting_site";
import { useState } from "react";
import Image from "next/image";
import { updateSettingSite } from "../actions";

export const settingSiteFormSchema = z.object({
  name: z.string().min(2),
  logo: z.string().nullable(),
  logoText: z.string().nullable(),
  favicon: z.string().nullable(),
  description: z.string().nullable(),
  keywords: z.string().nullable(),
  email: z.string().email({
    message: "ایمیل معتبر نیست",
  }),
  phone: z.string().min(10, {
    message: "شماره تلفن معتبر نیست",
  }),
  phone_reserve: z.string().nullable(),
  address: z.string().min(10, {
    message: "آدرس باید حداقل ۱۰ کاراکتر باشد",
  }),
  national_code: z.string().min(10, {
    message: "کد ملی معتبر نیست",
  }),
  postal_code: z.string().nullable(),
  about_us: z.string().min(10, {
    message: "درباره ما باید حداقل ۱۰ کاراکتر باشد",
  }),
  about_us_short: z.string().nullable(),
  map: z.string().nullable(),
  instagram: z.string().nullable(),
  telegram: z.string().nullable(),
  twitter: z.string().nullable(),
  youtube: z.string().nullable(),
  facebook: z.string().nullable(),
  type_of_company: z.string().min(2, {
    message: "نوع شرت باید حداقل ۲ کاراکتر باشد",
  }),
  field_of_activity: z.string().min(2, {
    message: "زمینه فعالیت باید حداقل ۲ کاراکتر باشد",
  }),
});

type SettingSiteFormProps = {
  initialData?: SettingSite;
};

export function SettingSiteForm({ initialData }: SettingSiteFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof settingSiteFormSchema>>({
    resolver: zodResolver(settingSiteFormSchema),
    defaultValues: initialData || {
      name: "",
      logo: null,
      logoText: null,
      favicon: null,
      description: null,
      keywords: null,
      email: "",
      phone: "",
      phone_reserve: null,
      address: "",
      national_code: "",
      postal_code: null,
      about_us: "",
      about_us_short: null,
      map: null,
      instagram: null,
      telegram: null,
      twitter: null,
      youtube: null,
      facebook: null,
      type_of_company: "",
      field_of_activity: "",
    },
  });

  // تغییر رنگ‌های input
  const inputClassName = `
    w-full px-4 py-3 
    bg-gray-50/50  // رنگ پس‌زمینه ملایم‌تر
    border-2 border-gray-100  // رنگ بوردر روشن‌تر
    rounded-lg 
    text-gray-700 text-base  // رنگ متن تیره‌تر
    font-medium
    placeholder:text-gray-400
    focus:bg-white
    focus:border-blue-400  // آبی ملایم‌تر
    focus:ring-2 
    focus:ring-blue-400/20  // آبی ملایم‌تر با شفافیت
    focus:outline-none
    transition duration-200
    text-right
  `;

  // تغییر رنگ label
  const labelClassName = "block text-base font-semibold text-gray-600 mb-2";  // خاکستری ملایم‌تر

  // تغییر رنگ error
  const errorClassName = "mt-1.5 text-sm font-medium text-rose-400";  // قرمز ملایم‌تر

  // استایل مشترک برای همه textarea ها
  const textareaClassName = `
    ${inputClassName}
    min-h-[120px]
    resize-vertical
  `;

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await updateSettingSite(data);
      if (result.success) {
        alert('تنظیمات با موفقیت ذخیره شد');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('خطا در ذخیره تنظیمات. لطفا دوباره تلاش کنید.');
    }
  });

  return (
    <form dir="rtl" onSubmit={handleFormSubmit} className="space-y-8">
      <div className="bg-white/80 border-2 border-gray-50 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-6 text-gray-700 flex items-center gap-2">
          <span className="w-1.5 h-7 bg-blue-400 rounded-lg"></span>  {/* آبی ملایم‌تر */}
          اطلاعات اصلی
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-2 group">
            <label className={`${labelClassName} group-hover:text-blue-600 transition-colors`}>نام سایت</label>
            <input
              {...form.register("name")}
              className={`${inputClassName} group-hover:border-blue-200`}
              placeholder="نام سایت را وارد کنید"
            />
            {form.formState.errors.name && (
              <p className={errorClassName}>{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="logo" className={labelClassName}>لوگو</label>
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg 
              hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300">
              <input
                type="file"
                id="logo"
                accept="image/*"
                className="hidden"
                {...form.register("logo")}
                onChange={(e) => {
                  form.register("logo").onChange(e);
                  handleLogoChange(e);
                }}
              />
              {logoPreview ? (
                <div className="relative w-48 h-48">
                  <Image 
                    src={logoPreview} 
                    alt="پیش‌نمایش لوگو"
                    fill
                    className="object-contain rounded-lg"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => setLogoPreview(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-10"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="logo"
                  className="flex flex-col items-center gap-2 cursor-pointer p-4"
                >
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-500">کلیک کنید یا فایل را اینجا رها کنید</span>
                  <span className="text-xs text-gray-400">حداکثر سایز: 2MB</span>
                </label>
              )}
            </div>
            {form.formState.errors.logo && (
              <p className={errorClassName}>{form.formState.errors.logo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="logoText" className={labelClassName}>متن لوگو</label>
            <input {...form.register("logoText")} className={inputClassName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="favicon" className={labelClassName}>فاوآیکن</label>
            <input {...form.register("favicon")} className={inputClassName} />
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span className="w-1.5 h-7 bg-green-600 rounded-lg"></span>
          اطلاعات تماس
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className={labelClassName}>ایمیل</label>
            <input {...form.register("email")} type="email" className={inputClassName} />
            {form.formState.errors.email && (
              <p className={errorClassName}>{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className={labelClassName}>تلفن</label>
            <input {...form.register("phone")} className={inputClassName} />
            {form.formState.errors.phone && (
              <p className={errorClassName}>{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone_reserve" className={labelClassName}>تلفن پشتیبان</label>
            <input {...form.register("phone_reserve")} className={inputClassName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className={labelClassName}>آدرس</label>
            <input {...form.register("address")} className={inputClassName} />
            {form.formState.errors.address && (
              <p className={errorClassName}>{form.formState.errors.address.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span className="w-1.5 h-7 bg-purple-600 rounded-lg"></span>
          اطلاعات شرکت
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="national_code" className={labelClassName}>کد ملی</label>
            <input {...form.register("national_code")} className={inputClassName} />
            {form.formState.errors.national_code && (
              <p className={errorClassName}>{form.formState.errors.national_code.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="postal_code" className={labelClassName}>کد پستی</label>
            <input {...form.register("postal_code")} className={inputClassName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="type_of_company" className={labelClassName}>نوع شرکت</label>
            <input {...form.register("type_of_company")} className={inputClassName} />
            {form.formState.errors.type_of_company && (
              <p className={errorClassName}>{form.formState.errors.type_of_company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="field_of_activity" className={labelClassName}>زمینه فعالیت</label>
            <input {...form.register("field_of_activity")} className={inputClassName} />
            {form.formState.errors.field_of_activity && (
              <p className={errorClassName}>{form.formState.errors.field_of_activity.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span className="w-1.5 h-7 bg-orange-600 rounded-lg"></span>
          شبکه‌های اتماعی
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="instagram" className={labelClassName}>اینستاگرام</label>
            <input {...form.register("instagram")} className={inputClassName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="telegram" className={labelClassName}>تلگرم</label>
            <input {...form.register("telegram")} className={inputClassName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="twitter" className={labelClassName}>توییتر</label>
            <input {...form.register("twitter")} className={inputClassName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="youtube" className={labelClassName}>یوتیوب</label>
            <input {...form.register("youtube")} className={inputClassName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="facebook" className={labelClassName}>فیسبوک</label>
            <input {...form.register("facebook")} className={inputClassName} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="map" className={labelClassName}>نقشه</label>
        <textarea {...form.register("map")} className={textareaClassName} />
      </div>

      <div className="flex justify-end">
        <button 
          type="submit"
          disabled={form.formState.isSubmitting} 
          className={`
            px-10 py-4 
            bg-gradient-to-l from-blue-400 to-indigo-400
            text-white text-base font-semibold 
            rounded-xl
            transition-all duration-300 
            shadow-sm hover:shadow-md
            hover:scale-[1.02]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${form.formState.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-500 hover:to-indigo-500'}
          `}
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              در حال ذخیره...
            </span>
          ) : 'ذخیره تنظیمات'}
        </button>
      </div>
    </form>
  );
}




