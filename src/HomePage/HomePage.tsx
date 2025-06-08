import { use, useState } from "react";
import { useShortUrlGenerationMutation } from "./hooks/useShortifyUrl";
import { useNavigateToShortLinkMutation } from "./hooks/useNavigateToShortLink";

const HomePage = () => {
  const [url, setUrl] = useState("");

  const {
    mutate: generateShortUrl,
    isPending,
    data,
    isSuccess: isShortUrlSuccess,
    error,
  } = useShortUrlGenerationMutation();

  const { mutateAsync: navigateToShortUrlAsync } =
    useNavigateToShortLinkMutation();

  const shortenUrl = () => {
    console.log("Shortening URL:", url);

    generateShortUrl(url);
  };

  const navigateToShortUrl = async () => {
    console.log("Navigating to short URL:", data);

    const longUrl = await navigateToShortUrlAsync(data);

    window.open(longUrl, "_blank");
  };

  return (
    <div
      className="flex justify-center pt-12 px-4 pb-20 min-h-screen bg-white"
      data-theme="light"
    >
      <div className="w-full max-w-2xl flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            Shorten your links with ease!
          </h1>
        </div>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Paste your URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="btn btn-primary whitespace-nowrap"
              onClick={shortenUrl}
            >
              Shorten URL
            </button>
          </div>
        </fieldset>

        {isPending && (
          <span className="loading loading-spinner loading-lg mx-auto"></span>
        )}
        {isShortUrlSuccess && (
          <div className="card bg-base-200 w-96 shadow-sm mx-auto">
            <div className="card-body">
              <h2 className="card-title">Your results are here!</h2>
              <p>
                <span className="font-semibold">Original URL:</span> <br />
                <a
                  href="https://shortify.example.com/abc123"
                  className="text-primary hover:underline"
                >
                  {url}
                </a>
              </p>
              <p>
                <span className="font-semibold">Shortened URL:</span>
                <br />
                <a
                  href="https://shortify.example.com/abc123"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToShortUrl();
                  }}
                >
                  {`https://${data}`}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
