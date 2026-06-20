import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";

export const prerender = false;

type LikesAction = "like" | "unlike";

type LikesBody = {
  articleId?: string;
  action?: LikesAction;
};

type LikesQueryResult = {
  likesCount?: number;
};

const API_VERSION = "2025-02-19";

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function normalizeCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : 0;
}

function isSafeDocumentId(value: string): boolean {
  // Supports common Sanity IDs and drafts IDs.
  return /^[a-zA-Z0-9._-]+$/.test(value);
}

function checkSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return false;
  }

  return origin === new URL(request.url).origin;
}

function getWriteClient() {
  const writeToken = import.meta.env.SANITY_WRITE_TOKEN;
  if (!writeToken) {
    return null;
  }

  return sanityClient.withConfig({
    useCdn: false,
    apiVersion: API_VERSION,
    token: writeToken,
  });
}

async function readLikesCount(articleId: string): Promise<number> {
  const result = await sanityClient.fetch<LikesQueryResult | null>(
    `*[_type == "hiking" && _id == $articleId][0]{
      "likesCount": coalesce(likesCount, 0)
    }`,
    { articleId },
  );

  return normalizeCount(result?.likesCount);
}

export const GET: APIRoute = async ({ url }) => {
  const articleId = url.searchParams.get("id")?.trim();
  if (!articleId || !isSafeDocumentId(articleId)) {
    return jsonResponse(400, { error: "invalid-article-id" });
  }

  const likesCount = await readLikesCount(articleId);
  return jsonResponse(200, { likesCount });
};

export const POST: APIRoute = async ({ request }) => {
  if (!checkSameOrigin(request)) {
    return jsonResponse(403, { error: "forbidden-origin" });
  }

  const writeClient = getWriteClient();
  if (!writeClient) {
    return jsonResponse(500, { error: "missing-write-token" });
  }

  let body: LikesBody;
  try {
    body = (await request.json()) as LikesBody;
  } catch {
    return jsonResponse(400, { error: "invalid-json" });
  }

  const articleId = body.articleId?.trim();
  const action = body.action;

  if (!articleId || !isSafeDocumentId(articleId)) {
    return jsonResponse(400, { error: "invalid-article-id" });
  }

  if (action !== "like" && action !== "unlike") {
    return jsonResponse(400, { error: "invalid-action" });
  }

  const currentCount = await readLikesCount(articleId);

  if (action === "like") {
    await writeClient
      .patch(articleId)
      .setIfMissing({ likesCount: 0 })
      .inc({ likesCount: 1 })
      .commit({ autoGenerateArrayKeys: false });
  }

  if (action === "unlike" && currentCount > 0) {
    await writeClient
      .patch(articleId)
      .setIfMissing({ likesCount: 0 })
      .inc({ likesCount: -1 })
      .commit({ autoGenerateArrayKeys: false });
  }

  const likesCount = await readLikesCount(articleId);
  return jsonResponse(200, { likesCount });
};
