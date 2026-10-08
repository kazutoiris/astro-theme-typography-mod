export interface Ghfind {
    score: string;
    badge: string;
}

let cache: Ghfind | undefined;

export async function getGhfindScore(): Promise<Ghfind> {
    if (cache) { return cache; }
    const res = await fetch("https://ghfind.com/u/kazutoiris");
    if (!res.ok) throw new Error("fetch fail " + (await res.text()));
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (!titleMatch) throw new Error("title parse fail " + html);
    const title = titleMatch[1];
    const scoreMatch = title.match(/—(.*?)\/100.*?·(.*?)\|/);
    if (!scoreMatch || !scoreMatch[1] || !scoreMatch[2]) {
        throw new Error("score parse fail " + title);
    }
    cache = { score: scoreMatch[1].trim(), badge: scoreMatch[2].trim() };
    return cache;
}
