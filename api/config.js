export default function handler(_req, res) {
    const forwardedProto = _req.headers["x-forwarded-proto"];
    const host = _req.headers.host || "";
    const inferredAppUrl = host
        ? `${forwardedProto || "https"}://${host}`
        : "";

    const url =
        process.env.SUPABASE_DATABASE_URL ||
        process.env.SUPABASE_PROJECT_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL ||
        "";
    const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const appUrl =
        process.env.APP_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.VERCEL_URL ||
        inferredAppUrl ||
        "";

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
        url,
        anonKey,
        redirectTo: appUrl.startsWith("http") ? appUrl : appUrl ? `https://${appUrl}` : ""
    });
}
