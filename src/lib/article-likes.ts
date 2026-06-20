type LikesResponse = {
  likesCount: number;
};

function toSafeCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : 0;
}

export function setupArticleLikes(
  buttonSelector: string,
  countSelector: string,
): void {
  const likeButton = document.querySelector<HTMLButtonElement>(buttonSelector);
  const likeCountText = document.querySelector<HTMLElement>(countSelector);

  if (!likeButton || !likeCountText) return;

  const articleId = likeButton.dataset.articleId?.trim();
  if (!articleId) return;

  let likesCount = toSafeCount(Number(likeButton.dataset.initialLikes ?? "0"));
  let isLikedInPageSession = false;
  let isPending = false;

  const render = (): void => {
    likeCountText.textContent = String(likesCount);
    likeButton.setAttribute("aria-pressed", String(isLikedInPageSession));
    likeButton.classList.toggle("text-primary", isLikedInPageSession);
    likeButton.classList.toggle("text-outline", !isLikedInPageSession);
  };

  const syncServerCount = async (): Promise<void> => {
    const response = await fetch(
      `/api/articles/likes?id=${encodeURIComponent(articleId)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as Partial<LikesResponse>;
    likesCount = toSafeCount(payload.likesCount);
    render();
  };

  const sendLikeAction = async (action: "like" | "unlike"): Promise<number> => {
    const response = await fetch("/api/articles/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        articleId,
        action,
      }),
    });

    if (!response.ok) {
      throw new Error(`likes-request-failed:${response.status}`);
    }

    const payload = (await response.json()) as Partial<LikesResponse>;
    return toSafeCount(payload.likesCount);
  };

  const onLikeClick = async (): Promise<void> => {
    if (isPending) return;
    isPending = true;
    likeButton.disabled = true;

    const previousLikedState = isLikedInPageSession;
    const previousCount = likesCount;
    const nextAction: "like" | "unlike" = previousLikedState
      ? "unlike"
      : "like";

    isLikedInPageSession = !previousLikedState;
    likesCount = previousLikedState
      ? Math.max(0, likesCount - 1)
      : likesCount + 1;
    render();

    try {
      likesCount = await sendLikeAction(nextAction);
      render();
    } catch {
      isLikedInPageSession = previousLikedState;
      likesCount = previousCount;
      render();
    } finally {
      isPending = false;
      likeButton.disabled = false;
    }
  };

  likeButton.addEventListener("click", () => {
    void onLikeClick();
  });

  render();
  void syncServerCount();
}
