export function setupArticleShare(
  buttonSelector: string,
  toastSelector: string,
): void {
  const shareButton = document.querySelector<HTMLButtonElement>(buttonSelector);
  const toast = document.querySelector<HTMLDivElement>(toastSelector);

  if (!shareButton || !toast) return;

  const copiedText = toast.dataset.copiedText ?? "";
  const copyErrorText = toast.dataset.copyErrorText ?? "";
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const showToast = (message: string): void => {
    if (!message) return;

    toast.textContent = message;
    toast.classList.remove("opacity-0");
    toast.classList.add("opacity-100");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
    }, 1800);
  };

  const fallbackCopyLink = async (): Promise<void> => {
    const url = window.location.href;

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      showToast(copiedText);
      return;
    }

    const tempInput = document.createElement("textarea");
    tempInput.value = url;
    tempInput.setAttribute("readonly", "");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(tempInput);

    if (!copied) {
      throw new Error("copy-failed");
    }

    showToast(copiedText);
  };

  const share = async (): Promise<void> => {
    const shareData: ShareData = {
      title: document.title,
      text: shareButton.dataset.shareText ?? "",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed.
      }
      return;
    }

    try {
      await fallbackCopyLink();
    } catch {
      showToast(copyErrorText);
    }
  };

  shareButton.addEventListener("click", () => {
    void share();
  });
}
