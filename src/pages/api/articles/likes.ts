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

type ArticleTypeQueryResult = {
  _type?: string;
};

const API_VERSION = "2025-02-19";
const DEFAULT_LIKES_DOCUMENT_TYPES = ["hiking", "tips", "consigli"] as const;

type LikesDocumentType = (typeof DEFAULT_LIKES_DOCUMENT_TYPES)[number];

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

function isSupportedLikesDocumentType(
  value: string,
  documentTypes: readonly LikesDocumentType[],
): boolean {
  return documentTypes.some((documentType) => documentType === value);
}

async function readArticleType(articleId: string): Promise<string | null> {
  const result = await sanityClient.fetch<ArticleTypeQueryResult | null>(
    `*[_id == $articleId][0]{
      _type
    }`,
    { articleId },
  );

  return typeof result?._type === "string" ? result._type : null;
}

async function readLikesCount(
  articleId: string,
  documentTypes: readonly LikesDocumentType[] = DEFAULT_LIKES_DOCUMENT_TYPES,
): Promise<number> {
  const result = await sanityClient.fetch<LikesQueryResult | null>(
    `*[_id == $articleId && _type in $documentTypes][0]{
      "likesCount": coalesce(likesCount, 0)
    }`,
    { articleId, documentTypes },
  );

  return normalizeCount(result?.likesCount);
}

export const GET: APIRoute = async ({ url }) => {
  const articleId = url.searchParams.get("id")?.trim();
  if (!articleId || !isSafeDocumentId(articleId)) {
    return jsonResponse(400, { error: "invalid-article-id" });
  }

  const articleType = await readArticleType(articleId);
  if (
    !articleType ||
    !isSupportedLikesDocumentType(articleType, DEFAULT_LIKES_DOCUMENT_TYPES)
  ) {
    return jsonResponse(400, { error: "unsupported-article-type" });
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

  const articleType = await readArticleType(articleId);
  if (
    !articleType ||
    !isSupportedLikesDocumentType(articleType, DEFAULT_LIKES_DOCUMENT_TYPES)
  ) {
    return jsonResponse(400, { error: "unsupported-article-type" });
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
