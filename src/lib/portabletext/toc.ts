export type PortableTextSpan = {
  _type?: string;
  text?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  children?: PortableTextSpan[];
};

export type TocHeading = {
  key: string;
  id: string;
  text: string;
  level: number;
};

type TocOptions = {
  styles?: string[];
};

const DEFAULT_STYLES = ["h2"];

function normalizeStyle(value: string): string {
  return value.trim().toLowerCase();
}

function toAsciiSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function blockToText(block: PortableTextBlock): string {
  if (!Array.isArray(block.children)) {
    return "";
  }

  return block.children
    .map((child) => {
      if (!child || typeof child !== "object") {
        return "";
      }

      return typeof child.text === "string" ? child.text : "";
    })
    .join("")
    .trim();
}

export function extractPortableTextToc(
  blocks: unknown,
  options: TocOptions = {},
): TocHeading[] {
  const styles = (options.styles ?? DEFAULT_STYLES).map(normalizeStyle);
  const safeBlocks = Array.isArray(blocks)
    ? (blocks as PortableTextBlock[])
    : [];

  const idCounts = new Map<string, number>();
  const headings: TocHeading[] = [];

  for (const block of safeBlocks) {
    const style =
      typeof block?.style === "string" ? normalizeStyle(block.style) : "";

    if (block?._type !== "block" || !style || !styles.includes(style)) {
      continue;
    }

    const text = blockToText(block);
    if (!text) {
      continue;
    }

    const baseId = toAsciiSlug(text) || "section";
    const seenCount = idCounts.get(baseId) ?? 0;
    idCounts.set(baseId, seenCount + 1);
    const id = seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`;

    const level = Number.parseInt(style.replace("h", ""), 10);
    headings.push({
      key: block._key ?? `${id}-${headings.length + 1}`,
      id,
      text,
      level: Number.isNaN(level) ? 2 : level,
    });
  }

  return headings;
}
