import { useTranslations } from "next-intl"

import { Avatar, AvatarImage } from "../ui/avatar"

export default function ReviewsSection() {
  const reviewKeys = ["review1", "review2", "review3"]
  const t = useTranslations("page")
  const tReviews = useTranslations("page.home.reviews")

  return (
    <div className="container flex max-w-screen-2xl flex-col items-center justify-center">
      <h1 className="mb-16 w-full text-center text-4xl font-bold text-primary lg:text-5xl">
        {t("home.reviews.title")}
      </h1>
      <div className="flex w-full flex-wrap items-center justify-center gap-10 md:gap-16">
        {reviewKeys.map((review) => (
          <div
            key={review}
            className={`flex h-96 w-80 flex-col items-center justify-start rounded-xl bg-card p-8 text-black shadow-lg`}
          >
            <Avatar className="h-20 w-20 shadow-lg blur-sm">
              <AvatarImage src={tReviews(`${review}.avatar`)} />
            </Avatar>
            <h1 className="mt-4 text-xl font-bold">
              {tReviews(`${review}.name`)}
            </h1>
            <h3 className="text-sm font-semibold ">
              {tReviews(`${review}.status`)}
            </h3>
            <div>
              <div className="mt-4 flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    className="mr-1 h-5 w-5 text-button"
                    key={index}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                <p className="ml-2 text-sm font-medium ">
                  {tReviews(`${review}.rating`)} / 5
                </p>
              </div>
            </div>
            <p className="pt-4 text-center tracking-wider">
              {" "}
              {tReviews(`${review}.review`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
