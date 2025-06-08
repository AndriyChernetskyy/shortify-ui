import { useEffect, useState } from "react";
import { useNavigateToShortLinkMutation } from "./hooks/useNavigateToShortLink";
import { useCreateShortUrlMutation } from "./hooks/useCreateShortUrl";
import type { UrlMapping } from "./types/urlMapping";

const HomePage = () => {
  const [urlInput, setUrlInput] = useState("");

  const {
    mutateAsync: generateShortUrlAsync,
    isPending,
    isSuccess,
    error: errorResponse,
  } = useCreateShortUrlMutation();

  const { mutateAsync: navigateToShortUrlAsync } =
    useNavigateToShortLinkMutation();

  const [urlData, setUrlData] = useState<UrlMapping | null>(null);

  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const getShortUrl = async () => {
    if (!isValidUrl(urlInput)) {
      setError(new Error("Please enter a valid URL."));
      return;
    }
    const urlMapping = await generateShortUrlAsync(urlInput);

    if (urlMapping !== null) {
      setUrlData(urlMapping);
      setUrlInput("");
      return;
    }

    if (errorResponse) {
      setError(errorResponse);
    }
  };

  const navigateToShortUrl = async () => {
    if (!urlData?.shortUrl) return;

    const longUrl = await navigateToShortUrlAsync(urlData.shortUrl);

    window.open(longUrl, "_blank");
  };

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const dismissError = () => {
    setError(null);
  };

  return (
    <div
      className="flex justify-center pt-12 px-4 pb-20 bg-white"
      data-theme="light"
    >
      <div className="w-full max-w-2xl flex flex-col gap-10">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Shortify your links with ease!
          </h1>
        </div>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Paste your URL here..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <button
              className="btn btn-primary whitespace-nowrap"
              onClick={getShortUrl}
            >
              Shortify URL
            </button>
          </div>
        </fieldset>

        {isPending && (
          <span className="loading loading-spinner loading-lg mx-auto"></span>
        )}
        {isSuccess && (
          <div className="card bg-base-200 w-96 shadow-sm mx-auto">
            <div className="card-body">
              <h2 className="card-title">Your results are here!</h2>
              <p>
                <span className="font-semibold">Original URL:</span> <br />
                <a
                  href={urlData?.url}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {urlData?.url}
                </a>
              </p>
              <p>
                <span className="font-semibold">Shortified URL:</span>
                <br />
                <a
                  href={`https://${urlData?.shortUrl}`}
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToShortUrl();
                  }}
                >
                  {`https://${urlData?.shortUrl}`}
                </a>
              </p>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="alert alert-error mx-auto mt-4 w-full max-w-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              onClick={dismissError}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
