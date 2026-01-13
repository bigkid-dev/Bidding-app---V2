import { toast } from "sonner";

interface ShareData {
  title: string;
  text?: string;
  url: string;
}

export const shareItem = async ({ title, text, url }: ShareData) => {
  const shareData = {
    title,
    text: text || `Check out this auction: ${title}`,
    url: url.startsWith("http") ? url : `${window.location.origin}${url}`,
  };

  // Check if Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      toast.success("Shared successfully!");
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== "AbortError") {
        fallbackShare(shareData.url);
      }
    }
  } else {
    fallbackShare(shareData.url);
  }
};

const fallbackShare = (url: string) => {
  navigator.clipboard.writeText(url).then(
    () => {
      toast.success("Link copied to clipboard!");
    },
    () => {
      toast.error("Failed to copy link");
    }
  );
};