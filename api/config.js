export default function handler(_req, res) {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "";

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
        url,
        anonKey,
        redirectTo: appUrl
    });
}
