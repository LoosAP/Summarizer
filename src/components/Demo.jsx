import React, { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import styles from "../style";

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [apiKey, setApiKey] = useState("");

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  return (
    <section className="w-full mt-16 ">
      <div className="flex flex-col w-full gap-2">
        <form
          className="flex flex-col items-center justify-center "
          onSubmit={handleSubmit}
        >
          <div className="relative w-full mt-2">
            <embed
              src={linkIcon}
              alt="link_icon"
              className="absolute left-0 w-5 my-3 ml-3"
            />
            <input
              type="url"
              name="url"
              placeholder="Enter an URL"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              required
              className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-poppins font-medium focus:border-y-pink-400 focus:outline-none focus:ring-0 peer"
              id=""
            />
            <button
              type="submit"
              className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700
            peer-focus:text-gray-700"
            >
              &#x21B5;
            </button>
          </div>
        </form>
        {/**Browse URL HIstory */}
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="flex flex-row items-center justify-start gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
                onClick={() => handleCopy(item.url)}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  type="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 text-sm font-medium text-blue-700 truncate font-poppins">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center max-w-full my-10">
        {isFetching ? (
          <embed
            src={loader}
            alt="loader"
            className="object-contain w-20 h-20 animate-[spin_3s_linear_infinite]"
          />
        ) : error ? (
          <p className={styles.paragraph}>
            well, that sucks <br />
            <span className="font-normal font-poppins text-dimWhite">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className={styles.heading2}>Article Summary</h2>
              <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                <p className={styles.paragraph}>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
