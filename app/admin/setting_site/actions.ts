'use server'

import db from "@/db";
import { settingSite } from "@/db/schema/setting_site";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { z } from "zod";
import type { settingSiteFormSchema } from "./features/setting_site.form";

export async function updateSettingSite(data: z.infer<typeof settingSiteFormSchema>) {
    try {
        const existingSettingSite = await db.query.settingSite.findFirst();
        
        const settingData = {
            ...data,
            name: data.name!,
            logo: data.logo || '',
            email: data.email!,
            phone: data.phone!,
            address: data.address!,
            national_code: data.national_code!,
            about_us: data.about_us!,
            type_of_company: data.type_of_company!,
            field_of_activity: data.field_of_activity!,
            updatedAt: new Date()
        };

        if (existingSettingSite) {
            await db.update(settingSite)
                .set(settingData)
                .where(eq(settingSite.id, existingSettingSite.id));
        } else {
            await db.insert(settingSite).values(settingData);
        }

        revalidatePath('/admin/setting-site');
        return { success: true };
    } catch (error) {
        console.error("خطا در ذخیره تنظیمات:", error);
        return { success: false, error: "خطا در ذخیره تنظیمات" };
    }
} 