import { SettingSiteForm } from "./features/setting_site.form";
import db from "@/db";

async function getData() {
    const existingSettingSite = await db.query.settingSite.findFirst();
    return existingSettingSite;
}

export default async function SettingSitePage() {
    const initialData = await getData();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto py-10 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">تنظیمات سایت</h1>
                    <p className="mt-2 text-gray-600 font-medium">اطلاعات پایه سایت را در این بخش وارد کنید</p>
                </div>
                <SettingSiteForm initialData={initialData} />
            </div>
        </div>
    );
}
