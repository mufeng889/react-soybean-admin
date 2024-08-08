export function Component({ url }: { url: string }) {
  return (
    <div className="h-full">
      <iframe
        id="iframePage"
        className="size-full"
        src={url}
      ></iframe>
    </div>
  );
}
