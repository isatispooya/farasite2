import { NextResponse } from "next/server";
import db from "@/db";
import settingSite from "@/db/schema/setting_site";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        
        if (!data.name || !data.email || !data.phone || !data.address || 
            !data.national_code || !data.about_us || !data.type_of_company || 
            !data.field_of_activity) {
            return NextResponse.json(
                { error: "لطفا همه فیلدهای اجباری را پر کنید" },
                { status: 400 }
            );
        }

        const existingSettings = await db.select().from(settingSite).limit(1);
        
        if (existingSettings.length > 0) {
            await db.update(settingSite)
                .set({
                    ...data,
                    updatedAt: new Date()
                })
                .where(eq(settingSite.id, existingSettings[0].id));
        } else {
            await db.insert(settingSite).values({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        return NextResponse.json({ message: "تنظیمات با موفقیت ذخیره شد" });
    } catch (error) {
        return NextResponse.json(
            { error: "خطا در ذخیره تنظیمات" },
            { status: 500 }
        );
    }
} 