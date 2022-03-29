import { useState, useEffect, useRef, forwardRef, RefObject } from 'react'

const Search = forwardRef(({ ...props }: { [key: string]: unknown }, ref) => {
  const [isSticky, setIsSticky] = useState(false)
  const cmpRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      {
        threshold: [1],
        rootMargin: '-1px 0px 0px 0px',
      }
    )

    cmpRef.current && observer.observe(cmpRef.current)

    return () => {
      cmpRef.current && observer.unobserve(cmpRef.current)
      setIsSticky(false)
    }
  }, [])
  return (
    <div
      className={`sticky z-50 mt-16 flex justify-center bg-white p-5 ${
        isSticky ? 'shadow' : ''
      } top-0`}
      ref={cmpRef}
    >
      <div className="relative md:w-8/12 w-full">
        <input
          type="search"
          className="bg-purple-white w-full rounded border-0 p-3 shadow"
          placeholder="It's my day-off..."
          ref={ref as RefObject<HTMLInputElement>}
          {...props}
        />
        {/* <div className="right-0 top-0 text-purple-lighter absolute mt-4 mr-4">
                <svg
                    version="1.1"
                    className="text-dark h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 52.966 52.966"
                    xmlSpace="preserve"
                >
                <path
                    d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                    c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                    C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
                    S32.459,40,21.983,40z"
                />
                </svg>
            </div> */}
      </div>
    </div>
  )
})
export default Search
